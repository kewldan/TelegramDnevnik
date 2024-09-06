from datetime import datetime
from typing import Annotated

from beanie import Document, Indexed
from pydantic import Field


class Account(Document):
    uid: Annotated[str, Indexed(unique=True)]
    token: str
    email: str
    password: str
    token_update: datetime = Field(default_factory=datetime.now)
    timestamp: datetime = Field(default_factory=datetime.now)
