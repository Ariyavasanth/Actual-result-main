import argparse
import logging
import os
import sys
from datetime import datetime
from typing import Dict, Iterable, List, Optional

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)


def load_env_file(path: str) -> None:
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_env_file(os.path.join(BACKEND_DIR, ".env"))

from db.db import SQLiteDB
from db.models import Country


SYSTEM_USER = "system"
COUNTRY_COLUMN_SIZE_STATEMENTS = [
    "ALTER TABLE Countries ALTER COLUMN country_name NVARCHAR(255) NOT NULL",
    "ALTER TABLE Countries ALTER COLUMN phone_code NVARCHAR(50) NOT NULL",
    "ALTER TABLE Countries ALTER COLUMN currency_code NVARCHAR(50) NOT NULL",
]

COUNTRIES: List[Dict[str, str]] = [
    {"country_name": "Åland Islands", "iso2": "AX", "iso3": "ALA", "phone_code": "+358", "currency_code": "EUR"},
    {"country_name": "Antarctica", "iso2": "AQ", "iso3": "ATA", "phone_code": "+672", "currency_code": ""},
    {"country_name": "Bolivia", "iso2": "BO", "iso3": "BOL", "phone_code": "+591", "currency_code": "BOB"},
    {"country_name": "Republic of the Congo", "iso2": "CG", "iso3": "COG", "phone_code": "+242", "currency_code": "XAF"},
    {"country_name": "Democratic Republic of the Congo", "iso2": "CD", "iso3": "COD", "phone_code": "+243", "currency_code": "CDF"},
    {"country_name": "Côte d'Ivoire", "iso2": "CI", "iso3": "CIV", "phone_code": "+225", "currency_code": "XOF"},
    {"country_name": "French Southern Territories", "iso2": "TF", "iso3": "ATF", "phone_code": "+262", "currency_code": "EUR"},
    {"country_name": "North Korea", "iso2": "KP", "iso3": "PRK", "phone_code": "+850", "currency_code": "KPW"},
    {"country_name": "South Korea", "iso2": "KR", "iso3": "KOR", "phone_code": "+82", "currency_code": "KRW"},
    {"country_name": "Kosovo", "iso2": "XK", "iso3": "XKX", "phone_code": "+383", "currency_code": "EUR"},
    {"country_name": "Libya", "iso2": "LY", "iso3": "LBY", "phone_code": "+218", "currency_code": "LYD"},
    {"country_name": "North Macedonia", "iso2": "MK", "iso3": "MKD", "phone_code": "+389", "currency_code": "MKD"},
    {"country_name": "Micronesia", "iso2": "FM", "iso3": "FSM", "phone_code": "+691", "currency_code": "USD"},
    {"country_name": "Moldova", "iso2": "MD", "iso3": "MDA", "phone_code": "+373", "currency_code": "MDL"},
    {"country_name": "Palestine", "iso2": "PS", "iso3": "PSE", "phone_code": "+970", "currency_code": "ILS"},
    {"country_name": "Saint Helena", "iso2": "SH", "iso3": "SHN", "phone_code": "+290", "currency_code": "SHP"},
    {"country_name": "Saint Barthélemy", "iso2": "BL", "iso3": "BLM", "phone_code": "+590", "currency_code": "EUR"},
    {"country_name": "Saint Martin (French part)", "iso2": "MF", "iso3": "MAF", "phone_code": "+590", "currency_code": "EUR"},
    {"country_name": "South Sudan", "iso2": "SS", "iso3": "SSD", "phone_code": "+211", "currency_code": "SSP"},
    {"country_name": "Svalbard and Jan Mayen", "iso2": "SJ", "iso3": "SJM", "phone_code": "+47", "currency_code": "NOK"},
    {"country_name": "Tanzania", "iso2": "TZ", "iso3": "TZA", "phone_code": "+255", "currency_code": "TZS"},
    {"country_name": "British Virgin Islands", "iso2": "VG", "iso3": "VGB", "phone_code": "+1-284", "currency_code": "USD"},
    {"country_name": "U.S. Virgin Islands", "iso2": "VI", "iso3": "VIR", "phone_code": "+1-340", "currency_code": "USD"},
    {"country_name": "Western Sahara", "iso2": "EH", "iso3": "ESH", "phone_code": "+212", "currency_code": "MAD"},
]

logger = logging.getLogger("manual_country_upsert")


class ManualCountryUpsertError(RuntimeError):
    """Raised when manual country upsert cannot continue safely."""


def configure_logging(verbose: bool = False) -> None:
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    )


def generate_country_id(iso2: str) -> str:
    return f"uuid-{iso2.strip().lower()}"


def ensure_country_column_sizes(session) -> None:
    dialect_name = session.get_bind().dialect.name
    if dialect_name != "mssql":
        return

    try:
        for statement in COUNTRY_COLUMN_SIZE_STATEMENTS:
            session.execute(text(statement))
        session.commit()
    except SQLAlchemyError as exc:
        session.rollback()
        raise ManualCountryUpsertError("Could not resize Countries columns before upsert") from exc


def find_existing_country(session, country: Dict[str, str]) -> Optional[Country]:
    country_id = generate_country_id(country["iso2"])
    with session.no_autoflush:
        existing = session.get(Country, country_id)
        if existing:
            return existing

        return (
            session.query(Country)
            .filter((Country.iso2 == country["iso2"]) | (Country.iso3 == country["iso3"]))
            .first()
        )


def apply_country_values(country_model: Country, country: Dict[str, str], is_insert: bool) -> None:
    now = datetime.utcnow()
    country_model.country_name = country["country_name"]
    country_model.iso2 = country["iso2"]
    country_model.iso3 = country["iso3"]
    country_model.phone_code = country["phone_code"]
    country_model.currency_code = country["currency_code"]

    if is_insert:
        country_model.created_by = SYSTEM_USER
        country_model.created_date = now
    else:
        country_model.updated_by = SYSTEM_USER
        country_model.updated_date = now


def upsert_countries(session, countries: Iterable[Dict[str, str]]) -> Dict[str, int]:
    stats = {"inserted": 0, "updated": 0, "rekeyed": 0}

    for country in countries:
        country_id = generate_country_id(country["iso2"])
        existing = find_existing_country(session, country)

        if existing is None:
            new_country = Country(country_id=country_id)
            apply_country_values(new_country, country, is_insert=True)
            session.add(new_country)
            stats["inserted"] += 1
            continue

        if existing.country_id != country_id:
            existing.country_id = country_id
            stats["rekeyed"] += 1

        apply_country_values(existing, country, is_insert=False)
        stats["updated"] += 1

    return stats


def run(args: argparse.Namespace) -> int:
    db = SQLiteDB()
    session = db.connect()
    if not session:
        logger.error("Could not connect to the database")
        return 1

    try:
        if args.commit:
            ensure_country_column_sizes(session)

        stats = upsert_countries(session, COUNTRIES)

        if args.commit:
            session.commit()
            logger.info("Manual country upsert committed")
        else:
            session.rollback()
            logger.info("Dry run only. Re-run with --commit to save country changes.")

        logger.info(
            "Countries processed=%s inserted=%s updated=%s rekeyed=%s",
            len(COUNTRIES),
            stats["inserted"],
            stats["updated"],
            stats["rekeyed"],
        )
        return 0
    except (ManualCountryUpsertError, SQLAlchemyError, ValueError) as exc:
        session.rollback()
        logger.exception("Manual country upsert failed and changes were rolled back: %s", exc)
        return 1
    finally:
        db.close()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Upsert manually curated countries needed by the CountriesNow states feed."
    )
    parser.add_argument(
        "--commit",
        action="store_true",
        help="Save changes to the database. Without this, the script runs as a dry run.",
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
    raise SystemExit(run(cli_args))
