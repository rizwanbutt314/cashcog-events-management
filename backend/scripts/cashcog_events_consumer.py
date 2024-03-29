import json
import requests
import psycopg2
from jsonschema import validate
from jsonschema.exceptions import ValidationError

# Stream Object Schema
stream_object_schema = {
    "type": "object",
    "properties": {
        "uuid": {"type": "string"},
        "description": {"type": "string"},
        "created_at": {"type": "string"},
        "amount": {"type": "number"},
        "currency": {"type": "string"},
        "employee": {
            "type": "object",
            "properties": {
                "uuid": {"type": "string"},
                "first_name": {"type": "string"},
                "last_name": {"type": "string"},
            }
        },
    },
    "required": ["uuid", "description", "created_at", "amount", "currency", "employee"]
}

# Postgres Database Settings
PG_HOST = 'localhost'
PG_USER = 'postgres'
PG_PASSWORD = 'postgres'
PG_DATABASE = 'cem'


def save_to_db(data, save_chunk):
    print("Saving {0} events...".format(save_chunk))
    sql = """
            INSERT INTO events_events(uuid, description, created_at, 
            amount, currency, employee_uuid, employee_first_name, employee_last_name, status) 
            VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
    conn = None
    try:
        conn = psycopg2.connect(dbname=PG_DATABASE,
                                user=PG_USER,
                                password=PG_PASSWORD,
                                host=PG_HOST,
                                port=5432)
        cur = conn.cursor()

        cur.executemany(sql, data)
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


def main(stream_url, save_chunk):
    print("Events Consumer script started")
    object_to_tuple = lambda obj: (obj['uuid'], obj['description'], obj['created_at'], obj['amount'],
                                   obj['currency'], obj['employee']['uuid'],
                                   obj['employee']['first_name'], obj['employee']['last_name'], 'P')

    data_objects = list()
    stream_data = requests.get(stream_url, stream=True)
    print("Extracting events from cashcog stream...")
    for data in stream_data.iter_lines():
        if data:
            try:
                stream_object = json.loads(data)
                validate(instance=stream_object, schema=stream_object_schema)
                data_objects.append(object_to_tuple(stream_object))
            except ValidationError as ve:
                print(str(ve))

        if len(data_objects) == save_chunk:
            save_to_db(data_objects, save_chunk)
            data_objects.clear()

    if data_objects:
        save_to_db(data_objects, save_chunk)
        data_objects.clear()


if __name__ == '__main__':
    stream_url = 'https://cashcog.xcnt.io/stream'
    save_chunk = 10
    main(stream_url, save_chunk)
