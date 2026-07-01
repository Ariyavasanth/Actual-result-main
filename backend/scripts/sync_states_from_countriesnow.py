import argparse
import logging
import os
import re
import sys
from datetime import datetime
from typing import Dict, Iterable, List, Optional, Set, Tuple

import requests
from dotenv import load_dotenv
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

load_dotenv(os.path.join(BACKEND_DIR, ".env"))

from db.db import SQLiteDB
from db.models import Country, State


COUNTRIES_STATES_URL = "https://countriesnow.space/api/v0.1/countries/states"
SYSTEM_USER = "system"
MAX_STATE_ID_LENGTH = 50
MSSQL_MAX_INSERT_PARAMETERS = 2000
STATE_INSERT_PARAMETER_COUNT = 8
STATE_COLUMN_SIZE_STATEMENTS = [
    "ALTER TABLE States ALTER COLUMN state_name NVARCHAR(255) NOT NULL",
    "ALTER TABLE States ALTER COLUMN state_code NVARCHAR(50) NULL",
]

logger = logging.getLogger("countriesnow_state_sync")


class StateSyncError(RuntimeError):
    """Raised when state synchronization cannot continue safely."""


def configure_logging(verbose: bool = False) -> None:
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    )


def clean_string(value: Optional[object]) -> Optional[str]:
    if value is None:
        return None
    text_value = str(value).strip()
    return text_value or None


def state_code_slug(state_code: str) -> str:
    code = clean_string(state_code)
    if not code:
        raise ValueError("Cannot generate state_id without state_code")

    slug = re.sub(r"[^a-z0-9]+", "-", code.lower()).strip("-")
    if not slug:
        raise ValueError(f"Cannot generate state_id from invalid state_code: {state_code!r}")
    return slug


def generate_country_id(iso2: str) -> str:
    iso2_value = clean_string(iso2)
    if not iso2_value:
        raise ValueError("Cannot generate country_id without ISO2")
    return f"uuid-{iso2_value.lower()}"


def generate_state_id(country_iso2: str, state_code: str) -> str:
    state_id = f"{generate_country_id(country_iso2)}-{state_code_slug(state_code)}"
    if len(state_id) > MAX_STATE_ID_LENGTH:
        raise ValueError(f"Generated state_id is longer than {MAX_STATE_ID_LENGTH}: {state_id}")
    return state_id


def fetch_country_states(timeout: int) -> List[dict]:
    logger.info("Fetching states from %s", COUNTRIES_STATES_URL)
    try:
        response = requests.get(
            COUNTRIES_STATES_URL,
            headers={
                "Accept": "application/json",
                "User-Agent": "ActualResultStateSync/1.0",
            },
            timeout=timeout,
        )
        response.raise_for_status()
        payload = response.json()
    except requests.Timeout as exc:
        raise StateSyncError(f"Timed out fetching CountriesNow states after {timeout}s") from exc
    except requests.HTTPError as exc:
        status_code = exc.response.status_code if exc.response is not None else "unknown"
        raise StateSyncError(f"CountriesNow states API returned HTTP {status_code}") from exc
    except requests.RequestException as exc:
        raise StateSyncError(f"Could not fetch CountriesNow states: {exc}") from exc
    except ValueError as exc:
        raise StateSyncError("CountriesNow states API returned invalid JSON") from exc

    if not isinstance(payload, dict):
        raise StateSyncError("CountriesNow states API returned an unexpected JSON shape")
    if payload.get("error"):
        raise StateSyncError(payload.get("msg") or "CountriesNow states API returned an error")

    rows = payload.get("data")
    if not isinstance(rows, list):
        raise StateSyncError("CountriesNow states API response does not contain a data list")

    logger.info("Fetched %s country rows with state data", len(rows))
    return rows


def existing_country_ids(session) -> Set[str]:
    return {country_id for (country_id,) in session.query(Country.country_id).all()}


def ensure_state_column_sizes(session) -> None:
    dialect_name = session.get_bind().dialect.name
    if dialect_name != "mssql":
        logger.debug("Skipping SQL Server column sizing for dialect %s", dialect_name)
        return

    logger.info("Ensuring States columns can hold CountriesNow values")
    try:
        for statement in STATE_COLUMN_SIZE_STATEMENTS:
            session.execute(text(statement))
        session.commit()
    except SQLAlchemyError as exc:
        session.rollback()
        raise StateSyncError("Could not resize States columns before sync") from exc


def normalize_state_rows(
    api_countries: Iterable[dict],
    db_country_ids: Set[str],
    limit_countries: Optional[int] = None,
) -> Tuple[List[Dict[str, str]], Dict[str, int]]:
    states: List[Dict[str, str]] = []
    stats = {
        "matched_countries": 0,
        "skipped_countries": 0,
        "skipped_states": 0,
        "skipped_states_missing_country": 0,
        "skipped_malformed_states": 0,
    }
    matched_countries = 0

    for api_country in api_countries:
        country_name = clean_string(api_country.get("name"))
        iso2 = clean_string(api_country.get("iso2") or api_country.get("Iso2") or api_country.get("ISO2"))
        if not iso2:
            stats["skipped_countries"] += 1
            logger.warning("Skipping country row without ISO2: %s", api_country)
            continue

        country_id = generate_country_id(iso2)
        api_states = api_country.get("states") or []
        api_state_count = len(api_states) if isinstance(api_states, list) else 0

        if country_id not in db_country_ids:
            stats["skipped_countries"] += 1
            stats["skipped_states"] += api_state_count
            stats["skipped_states_missing_country"] += api_state_count
            logger.warning(
                "Skipping %s states for %s because country_id %s does not exist in Countries",
                api_state_count,
                country_name or iso2,
                country_id,
            )
            continue

        matched_countries += 1
        stats["matched_countries"] += 1
        if limit_countries and matched_countries > limit_countries:
            break

        if not isinstance(api_states, list):
            stats["skipped_malformed_states"] += 1
            stats["skipped_states"] += 1
            logger.warning("Skipping malformed states list for %s", country_name or iso2)
            continue

        for api_state in api_states:
            if not isinstance(api_state, dict):
                stats["skipped_malformed_states"] += 1
                stats["skipped_states"] += 1
                logger.warning("Skipping malformed state row for %s: %s", country_name or iso2, api_state)
                continue

            state_name = clean_string(api_state.get("name") or api_state.get("state_name"))
            state_code = clean_string(
                api_state.get("state_code")
                or api_state.get("stateCode")
                or api_state.get("code")
            )

            if not state_name or not state_code:
                stats["skipped_malformed_states"] += 1
                stats["skipped_states"] += 1
                logger.warning(
                    "Skipping state for %s because name/code is missing: %s",
                    country_name or iso2,
                    api_state,
                )
                continue

            try:
                state_id = generate_state_id(iso2, state_code)
            except ValueError as exc:
                stats["skipped_malformed_states"] += 1
                stats["skipped_states"] += 1
                logger.warning("Skipping state for %s: %s", country_name or iso2, exc)
                continue

            states.append(
                {
                    "state_id": state_id,
                    "state_name": state_name,
                    "state_code": state_code,
                    "country_id": country_id,
                }
            )

    return states, stats


def apply_state_values(state_model: State, state: Dict[str, str], is_insert: bool) -> None:
    now = datetime.utcnow()
    state_model.state_name = state["state_name"]
    state_model.state_code = state["state_code"]
    state_model.country_id = state["country_id"]

    if is_insert:
        state_model.created_by = SYSTEM_USER
        state_model.created_date = now
    else:
        state_model.updated_by = SYSTEM_USER
        state_model.updated_date = now


def effective_batch_size(session, requested_batch_size: int) -> int:
    if requested_batch_size <= 0:
        return requested_batch_size

    dialect_name = session.get_bind().dialect.name
    if dialect_name != "mssql":
        return requested_batch_size

    max_rows = MSSQL_MAX_INSERT_PARAMETERS // STATE_INSERT_PARAMETER_COUNT
    if requested_batch_size > max_rows:
        logger.info(
            "Reducing batch size from %s to %s for SQL Server parameter limits",
            requested_batch_size,
            max_rows,
        )
        return max_rows
    return requested_batch_size


def upsert_states(
    session,
    states: Iterable[Dict[str, str]],
    batch_size: int,
    flush_enabled: bool,
) -> Dict[str, int]:
    stats = {"inserted": 0, "updated": 0, "processed": 0, "skipped_duplicates": 0}
    seen_state_ids: Set[str] = set()

    for state in states:
        state_id = state["state_id"]
        if state_id in seen_state_ids:
            stats["skipped_duplicates"] += 1
            logger.warning("Skipping duplicate state_id from API payload: %s", state_id)
            continue
        seen_state_ids.add(state_id)

        with session.no_autoflush:
            existing = session.get(State, state_id)

        if existing is None:
            new_state = State(state_id=state_id)
            apply_state_values(new_state, state, is_insert=True)
            session.add(new_state)
            stats["inserted"] += 1
        else:
            apply_state_values(existing, state, is_insert=False)
            stats["updated"] += 1

        stats["processed"] += 1
        if flush_enabled and batch_size > 0 and stats["processed"] % batch_size == 0:
            session.flush()
            logger.info("Prepared %s states so far", stats["processed"])

    if flush_enabled:
        session.flush()
    return stats


def sync_states(args: argparse.Namespace) -> int:
    try:
        api_countries = fetch_country_states(args.timeout)
    except StateSyncError as exc:
        logger.exception("State sync failed before database changes began: %s", exc)
        return 1

    db = SQLiteDB()
    session = db.connect()
    if not session:
        logger.error("Could not connect to the database")
        return 1

    try:
        if args.commit:
            ensure_state_column_sizes(session)

        country_ids = existing_country_ids(session)
        states, normalize_stats = normalize_state_rows(api_countries, country_ids, args.limit_countries)
        if args.limit_states:
            states = states[: args.limit_states]

        stats = upsert_states(
            session,
            states,
            effective_batch_size(session, args.batch_size),
            flush_enabled=args.commit,
        )

        if args.commit:
            session.commit()
            logger.info("State sync committed")
        else:
            session.rollback()
            logger.info("Dry run only. Re-run with --commit to save state changes.")

        logger.info(
            "States processed=%s inserted=%s updated=%s skipped=%s skipped_missing_country=%s skipped_malformed=%s skipped_duplicates=%s",
            stats["processed"],
            stats["inserted"],
            stats["updated"],
            normalize_stats["skipped_states"] + stats["skipped_duplicates"],
            normalize_stats["skipped_states_missing_country"],
            normalize_stats["skipped_malformed_states"],
            stats["skipped_duplicates"],
        )
        logger.info(
            "Countries matched=%s skipped=%s",
            normalize_stats["matched_countries"],
            normalize_stats["skipped_countries"],
        )
        return 0
    except (StateSyncError, SQLAlchemyError, ValueError) as exc:
        session.rollback()
        logger.exception("State sync failed and changes were rolled back: %s", exc)
        return 1
    finally:
        db.close()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sync States from CountriesNow /countries/states into the existing database."
    )
    parser.add_argument(
        "--commit",
        action="store_true",
        help="Save changes to the database. Without this, the script runs as a dry run.",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=60,
        help="Seconds to wait for the CountriesNow API response.",
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=200,
        help="Flush pending ORM changes after this many state rows.",
    )
    parser.add_argument(
        "--limit-countries",
        type=int,
        default=None,
        help="Process only the first N API countries that already exist in Countries.",
    )
    parser.add_argument(
        "--limit-states",
        type=int,
        default=None,
        help="Process only the first N normalized state rows. Useful for testing.",
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
    raise SystemExit(sync_states(cli_args))
