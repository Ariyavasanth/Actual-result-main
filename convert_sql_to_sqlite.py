import argparse
import re
import sqlite3
from pathlib import Path


TYPE_MAP = (
    ("bigint", "INTEGER"),
    ("int", "INTEGER"),
    ("smallint", "INTEGER"),
    ("tinyint", "INTEGER"),
    ("bit", "INTEGER"),
    ("decimal", "REAL"),
    ("numeric", "REAL"),
    ("money", "REAL"),
    ("float", "REAL"),
    ("real", "REAL"),
    ("datetime2", "TEXT"),
    ("datetime", "TEXT"),
    ("date", "TEXT"),
    ("time", "TEXT"),
    ("nvarchar", "TEXT"),
    ("varchar", "TEXT"),
    ("nchar", "TEXT"),
    ("char", "TEXT"),
    ("text", "TEXT"),
    ("ntext", "TEXT"),
    ("uniqueidentifier", "TEXT"),
    ("varbinary", "BLOB"),
    ("binary", "BLOB"),
    ("image", "BLOB"),
)


def sqlite_identifier(name):
    return '"' + name.replace('"', '""') + '"'


def split_batches(sql):
    batches = []
    current = []
    for line in sql.splitlines():
        if line.strip().upper() == "GO":
            if current:
                batches.append("\n".join(current))
                current = []
            continue
        current.append(line)
    if current:
        batches.append("\n".join(current))
    return batches


def sqlite_type(sql_server_type):
    normalized = sql_server_type.strip().lower()
    for source, target in TYPE_MAP:
        if normalized.startswith(source):
            return target
    return "TEXT"


def convert_create_table(batch):
    match = re.search(
        r"CREATE\s+TABLE\s+\[dbo\]\.\[(?P<table>[^\]]+)\]\s*\((?P<body>.*)\)\s*(?:ON|TEXTIMAGE_ON|$)",
        batch,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if not match:
        return None

    table = match.group("table")
    if table.lower() == "sqlite_sequence":
        return None

    body = match.group("body")
    primary_key = None
    pk_match = re.search(
        r"PRIMARY\s+KEY\s+CLUSTERED\s*\(\s*\[(?P<column>[^\]]+)\]",
        body,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if pk_match:
        primary_key = pk_match.group("column")

    columns = []
    for line in body.splitlines():
        column_match = re.match(
            r"\s*\[(?P<name>[^\]]+)\]\s+\[(?P<type>[^\]]+)\](?:\([^)]+\))?\s*(?P<rest>.*)",
            line,
            flags=re.IGNORECASE,
        )
        if not column_match:
            continue

        name = column_match.group("name")
        column_type = sqlite_type(column_match.group("type"))
        rest = column_match.group("rest").upper()
        constraints = []
        if "NOT NULL" in rest:
            constraints.append("NOT NULL")
        if primary_key == name:
            constraints.append("PRIMARY KEY")

        columns.append(
            "    "
            + sqlite_identifier(name)
            + " "
            + column_type
            + (" " + " ".join(constraints) if constraints else "")
        )

    if not columns:
        return None

    return "CREATE TABLE IF NOT EXISTS {} (\n{}\n);".format(
        sqlite_identifier(table),
        ",\n".join(columns),
    )


def clean_values(values):
    values = re.sub(
        r"CAST\s*\(\s*N?'([^']*(?:''[^']*)*)'\s+AS\s+\w+(?:\(\d+\))?\s*\)",
        r"'\1'",
        values,
        flags=re.IGNORECASE,
    )
    values = re.sub(r"\bN'", "'", values)
    return values


def convert_insert(statement):
    match = re.match(
        r"\s*INSERT\s+\[dbo\]\.\[(?P<table>[^\]]+)\]\s*\((?P<columns>.*?)\)\s*VALUES\s*\((?P<values>.*)\)\s*$",
        statement.strip(),
        flags=re.IGNORECASE | re.DOTALL,
    )
    if not match:
        return None

    table = match.group("table")
    if table.lower() == "sqlite_sequence":
        return None

    columns = re.findall(r"\[([^\]]+)\]", match.group("columns"))
    if not columns:
        return None

    return "INSERT INTO {} ({}) VALUES ({});".format(
        sqlite_identifier(table),
        ", ".join(sqlite_identifier(column) for column in columns),
        clean_values(match.group("values")),
    )


def extract_insert_statements(batch):
    if not re.search(r"^\s*INSERT\s+\[dbo\]\.", batch, flags=re.IGNORECASE | re.MULTILINE):
        return []
    parts = re.split(r"(?=^\s*INSERT\s+\[dbo\]\.)", batch, flags=re.IGNORECASE | re.MULTILINE)
    return [part.strip() for part in parts if part.strip().upper().startswith("INSERT")]


def convert(sql_text):
    creates = []
    inserts = []

    for batch in split_batches(sql_text):
        if re.search(r"CREATE\s+TABLE\s+\[dbo\]\.", batch, flags=re.IGNORECASE):
            create_sql = convert_create_table(batch)
            if create_sql:
                creates.append(create_sql)
            continue

        for insert_statement in extract_insert_statements(batch):
            insert_sql = convert_insert(insert_statement)
            if insert_sql:
                inserts.append(insert_sql)

    return creates, inserts


def main():
    parser = argparse.ArgumentParser(description="Convert a SQL Server .sql script to a SQLite .db file.")
    parser.add_argument("input_sql", type=Path)
    parser.add_argument("output_db", type=Path)
    args = parser.parse_args()

    sql_text = args.input_sql.read_text(encoding="utf-16", errors="ignore")
    if "CREATE TABLE" not in sql_text:
        sql_text = args.input_sql.read_text(encoding="utf-8", errors="ignore")

    creates, inserts = convert(sql_text)
    args.output_db.parent.mkdir(parents=True, exist_ok=True)
    if args.output_db.exists():
        args.output_db.unlink()

    connection = sqlite3.connect(args.output_db)
    try:
        cursor = connection.cursor()
        cursor.execute("PRAGMA foreign_keys = OFF;")

        for statement in creates:
            cursor.execute(statement)

        cursor.execute("BEGIN;")
        inserted = 0
        skipped = 0
        for statement in inserts:
            try:
                cursor.execute(statement)
                inserted += 1
            except sqlite3.Error as error:
                skipped += 1
                print(f"Skipped insert: {error}")
        connection.commit()

        table_count = cursor.execute(
            "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
        ).fetchone()[0]
    finally:
        connection.close()

    print(f"Created: {args.output_db}")
    print(f"Tables: {table_count}")
    print(f"Inserted rows: {inserted}")
    print(f"Skipped inserts: {skipped}")


if __name__ == "__main__":
    main()
