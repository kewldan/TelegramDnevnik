from typing import Annotated

from beanie import Document, PydanticObjectId, Indexed
from pydantic import BaseModel


class Period(BaseModel):
    period_id: str
    name: str
    date_from: str
    date_to: str


class Child(Document):
    account_id: Annotated[PydanticObjectId, Indexed()]
    child_id: str
    education_name: str
    education_id: str
    group_name: str
    group_id: str
    first_name: str
    surname: str
    middle_name: str
    uid: str
    periods: list[Period]
