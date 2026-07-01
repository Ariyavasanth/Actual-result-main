import argparse
import logging
import os
import sys
from datetime import datetime
from typing import Dict, Iterable, List, Optional

import requests
from dotenv import load_dotenv
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

load_dotenv(os.path.join(BACKEND_DIR, ".env"))

from db.db import SQLiteDB
from db.models import Country


COUNTRIES_ISO_URL = "https://countriesnow.space/api/v0.1/countries/iso"
SYSTEM_USER = "system"
CHILD_COUNTRY_TABLES = ["States", "Cities", "InstituteCampuses", "Users"]
COUNTRY_COLUMN_SIZE_STATEMENTS = [
    "ALTER TABLE Countries ALTER COLUMN country_name NVARCHAR(255) NOT NULL",
    "ALTER TABLE Countries ALTER COLUMN phone_code NVARCHAR(50) NOT NULL",
    "ALTER TABLE Countries ALTER COLUMN currency_code NVARCHAR(50) NOT NULL",
]

logger = logging.getLogger("countriesnow_country_sync")


class CountrySyncError(RuntimeError):
    """Raised when country synchronization cannot continue safely."""


def configure_logging(verbose: bool = False) -> None:
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    )


def first_present(row: Dict, *keys: str) -> Optional[object]:
    for key in keys:
        value = row.get(key)
        if value not in (None, ""):
            return value
    return None


def clean_string(value: Optional[object]) -> Optional[str]:
    if value is None:
        return None
    if isinstance(value, (list, tuple, set)):
        parts = [str(item).strip() for item in value if str(item).strip()]
        return ", ".join(parts) if parts else None
    text_value = str(value).strip()
    return text_value or None


def generate_country_id(iso2: str) -> str:
    iso2_value = clean_string(iso2)
    if not iso2_value:
        raise ValueError("Cannot generate country_id without ISO2")
    return f"uuid-{iso2_value.lower()}"


def normalize_country_row(row: Dict) -> Optional[Dict[str, Optional[str]]]:
    country_name = clean_string(first_present(row, "name", "country", "country_name", "countryName"))
    iso2 = clean_string(first_present(row, "Iso2", "iso2", "ISO2", "alpha2Code"))
    iso3 = clean_string(first_present(row, "Iso3", "iso3", "ISO3", "alpha3Code"))

    if not country_name or not iso2 or not iso3:
        logger.warning("Skipping malformed country row from API: %s", row)
        return None

    phone_code = clean_string(
        first_present(
            row,
            "phone_code",
            "phoneCode",
            "phonecode",
            "dial_code",
            "dialCode",
            "calling_code",
            "callingCode",
            "callingCodes",
        )
    )
    currency_code = clean_string(
        first_present(
            row,
            "currency_code",
            "currencyCode",
            "currency",
            "currencies",
        )
    )

    return {
        "country_id": generate_country_id(iso2),
        "country_name": country_name,
        "iso2": iso2.upper(),
        "iso3": iso3.upper(),
        "phone_code": phone_code,
        "currency_code": currency_code,
    }


def fetch_countries(timeout: int) -> List[Dict[str, Optional[str]]]:
    logger.info("Fetching countries from %s", COUNTRIES_ISO_URL)
    try:
        response = requests.get(
            COUNTRIES_ISO_URL,
            headers={
                "Accept": "application/json",
                "User-Agent": "ActualResultCountrySync/1.0",
            },
            timeout=timeout,
        )
        response.raise_for_status()
        payload = response.json()
    except requests.Timeout as exc:
        raise CountrySyncError(f"Timed out fetching CountriesNow data after {timeout}s") from exc
    except requests.HTTPError as exc:
        status_code = exc.response.status_code if exc.response is not None else "unknown"
        raise CountrySyncError(f"CountriesNow API returned HTTP {status_code}") from exc
    except requests.RequestException as exc:
        raise CountrySyncError(f"Could not fetch CountriesNow data: {exc}") from exc
    except ValueError as exc:
        raise CountrySyncError("CountriesNow API returned invalid JSON") from exc

    if not isinstance(payload, dict):
        raise CountrySyncError("CountriesNow API returned an unexpected JSON shape")
    if payload.get("error"):
        raise CountrySyncError(payload.get("msg") or "CountriesNow API returned an error")

    rows = payload.get("data")
    if not isinstance(rows, list):
        raise CountrySyncError("CountriesNow API response does not contain a data list")

    countries = [country for country in (normalize_country_row(row) for row in rows) if country]
    logger.info("Fetched %s valid country rows", len(countries))
    return countries


def find_existing_country(session, country: Dict[str, Optional[str]]) -> Optional[Country]:
    with session.no_autoflush:
        existing = session.get(Country, country["country_id"])
        if existing:
            return existing

        return (
            session.query(Country)
            .filter((Country.iso2 == country["iso2"]) | (Country.iso3 == country["iso3"]))
            .first()
        )


def ensure_country_column_sizes(session) -> None:
    dialect_name = session.get_bind().dialect.name
    if dialect_name != "mssql":
        logger.debug("Skipping SQL Server column sizing for dialect %s", dialect_name)
        return

    logger.info("Ensuring Countries columns can hold CountriesNow values")
    try:
        for statement in COUNTRY_COLUMN_SIZE_STATEMENTS:
            session.execute(text(statement))
        session.commit()
    except SQLAlchemyError as exc:
        session.rollback()
        raise CountrySyncError("Could not resize Countries columns before sync") from exc


def ensure_country_constraints_enabled(session) -> None:
    dialect_name = session.get_bind().dialect.name
    if dialect_name != "mssql":
        return

    try:
        enable_country_constraints(session)
        session.commit()
    except SQLAlchemyError as exc:
        session.rollback()
        raise CountrySyncError("Could not ensure country foreign key constraints are enabled") from exc


def disable_country_constraints(session) -> bool:
    try:
        for table_name in CHILD_COUNTRY_TABLES:
            session.execute(text(f"ALTER TABLE {table_name} NOCHECK CONSTRAINT ALL"))
        return True
    except SQLAlchemyError:
        logger.debug("Could not disable SQL Server constraints; continuing without it.", exc_info=True)
        session.rollback()
        return False


def enable_country_constraints(session) -> None:
    for table_name in CHILD_COUNTRY_TABLES:
        session.execute(text(f"ALTER TABLE {table_name} CHECK CONSTRAINT ALL"))


def best_effort_enable_country_constraints(session) -> None:
    try:
        enable_country_constraints(session)
        session.commit()
    except Exception:
        session.rollback()
        logger.exception(
            "Could not re-enable country foreign key constraints. "
            "Please inspect existing child rows for orphaned country_id values."
        )


def update_child_country_ids(session, old_country_id: str, new_country_id: str) -> None:
    for table_name in CHILD_COUNTRY_TABLES:
        session.execute(
            text(f"UPDATE {table_name} SET country_id = :new_id WHERE country_id = :old_id"),
            {"new_id": new_country_id, "old_id": old_country_id},
        )


def apply_country_values(country_model: Country, country: Dict[str, Optional[str]], is_insert: bool) -> None:
    now = datetime.utcnow()
    country_model.country_name = country["country_name"]
    country_model.iso2 = country["iso2"]
    country_model.iso3 = country["iso3"]

    # The exact /countries/iso endpoint may omit these fields, while the local schema
    # currently marks them NOT NULL. Preserve existing values during updates when absent.
    if country["phone_code"] is not None or is_insert:
        country_model.phone_code = country["phone_code"] or ""
    if country["currency_code"] is not None or is_insert:
        country_model.currency_code = country["currency_code"] or ""

    if is_insert:
        country_model.created_by = SYSTEM_USER
        country_model.created_date = now
    else:
        country_model.updated_by = SYSTEM_USER
        country_model.updated_date = now


def upsert_countries(session, countries: Iterable[Dict[str, Optional[str]]]) -> Dict[str, int]:
    stats = {"inserted": 0, "updated": 0, "rekeyed": 0, "skipped": 0}
    constraints_disabled = False

    try:
        for country in countries:
            country_id = country["country_id"]
            existing = find_existing_country(session, country)

            if existing is None:
                new_country = Country(country_id=country_id)
                apply_country_values(new_country, country, is_insert=True)
                session.add(new_country)
                stats["inserted"] += 1
                continue

            if existing.country_id != country_id:
                if not constraints_disabled:
                    constraints_disabled = disable_country_constraints(session)
                logger.info(
                    "Updating country_id for %s from %s to %s",
                    country["country_name"],
                    existing.country_id,
                    country_id,
                )
                update_child_country_ids(session, existing.country_id, country_id)
                existing.country_id = country_id
                stats["rekeyed"] += 1

            apply_country_values(existing, country, is_insert=False)
            stats["updated"] += 1

        if constraints_disabled:
            enable_country_constraints(session)

        return stats
    except Exception:
        session.rollback()
        if constraints_disabled:
            best_effort_enable_country_constraints(session)
        raise


def sync_countries(args: argparse.Namespace) -> int:
    try:
        countries = fetch_countries(args.timeout)
        if args.limit:
            countries = countries[: args.limit]
    except CountrySyncError as exc:
        logger.exception("Country sync failed before database changes began: %s", exc)
        return 1

    db = SQLiteDB()
    session = db.connect()
    if not session:
        logger.error("Could not connect to the database")
        return 1

    try:
        if args.commit:
            ensure_country_column_sizes(session)
            ensure_country_constraints_enabled(session)
        stats = upsert_countries(session, countries)
        if args.commit:
            session.commit()
            logger.info("Country sync committed")
        else:
            session.rollback()
            logger.info("Dry run only. Re-run with --commit to save country changes.")

        logger.info(
            "Countries processed=%s inserted=%s updated=%s rekeyed=%s skipped=%s",
            len(countries),
            stats["inserted"],
            stats["updated"],
            stats["rekeyed"],
            stats["skipped"],
        )
        return 0
    except (CountrySyncError, SQLAlchemyError, ValueError) as exc:
        session.rollback()
        logger.exception("Country sync failed and changes were rolled back: %s", exc)
        return 1
    finally:
        db.close()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync Countries from CountriesNow /countries/iso into the existing database."
    )
    parser.add_argument(
        "--commit",
        action="store_true",
        help="Save changes to the database. Without this, the script runs as a dry run.",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=30,
        help="Seconds to wait for the CountriesNow API response.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Process only the first N API countries. Useful for testing.",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Enable debug logging.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    cli_args = parse_args()
    configure_logging(cli_args.verbose)
    raise SystemExit(sync_countries(cli_args))
