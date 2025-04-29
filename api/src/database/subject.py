from typing import Annotated

from beanie import Document, PydanticObjectId, Indexed


class Subject(Document):
    account_id: Annotated[PydanticObjectId, Indexed()]
