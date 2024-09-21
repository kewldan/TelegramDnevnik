from datetime import datetime


def serialize_datetime(value: datetime) -> str:
    formatted_date = value.strftime('%d.%m.%Y') + value.strftime('%z')
    formatted_time = value.strftime('%H:%M:%S')
    return f"{formatted_date}+{formatted_time}"
