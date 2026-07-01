import os
import sys

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


COUNTRIES = [
    ("uuid-ax", "Aland Islands"),
    ("uuid-aq", "Antarctica"),
    ("uuid-bo", "Bolivia"),
    ("uuid-cd", "Congo"),
    ("uuid-ci", "Ivory Coast"),
    ("uuid-tf", "French Southern Territories"),
    ("uuid-kp", "North Korea"),
    ("uuid-kr", "South Korea"),
    ("uuid-xk", "Kosovo"),
    ("uuid-ly", "Libya"),
    ("uuid-mk", "Macedonia"),
    ("uuid-fm", "Micronesia"),
    ("uuid-md", "Moldova"),
    ("uuid-an", "Netherlands Antilles"),
    ("uuid-ps", "Palestinian Territory Occupied"),
    ("uuid-sh", "Saint Helena"),
    ("uuid-bl", "Saint-Barthelemy"),
    ("uuid-mf", "Saint-Martin (French part)"),
    ("uuid-ss", "South Sudan"),
    ("uuid-sj", "Svalbard And Jan Mayen Islands"),
    ("uuid-tz", "Tanzania"),
    ("uuid-vg", "Virgin Islands (British)"),
    ("uuid-vi", "Virgin Islands (US)"),
    ("uuid-eh", "Western Sahara"),
]


def main() -> int:
    db = SQLiteDB()
    session = db.connect()
    if not session:
        print("Could not connect to the database.")
        return 1

    try:
        ids = [country_id for country_id, _name in COUNTRIES]
        existing = {
            country.country_id: country
            for country in session.query(Country).filter(Country.country_id.in_(ids)).all()
        }

        found = 0
        missing = 0
        for country_id, expected_name in COUNTRIES:
            country = existing.get(country_id)
            if country:
                found += 1
                print(f"FOUND   {country_id:8} {country.country_name}")
            else:
                missing += 1
                print(f"MISSING {country_id:8} {expected_name}")

        print(f"Summary: found={found} missing={missing} total={len(COUNTRIES)}")
        return 0
    finally:
        db.close()


if __name__ == "__main__":
    raise SystemExit(main())
