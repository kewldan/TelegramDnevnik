import json
import os

from pydantic import BaseModel

FILENAME = 'data/config.json'


class Config(BaseModel):
    port: int = 80
    debug: bool = True
    database_url: str = ''
    database_name: str = ''

    def __init__(self) -> None:
        loaded = False

        dir_name = os.path.dirname(FILENAME)

        if not os.path.exists(dir_name):
            os.makedirs(dir_name)

        if os.path.exists(FILENAME):
            with open(FILENAME, 'r', encoding='utf-8') as f:
                super().__init__(**json.load(f))
                loaded = True
        else:
            super().__init__()

        with open(FILENAME, 'w', encoding='utf-8') as f:
            json.dump(self.model_dump(), f, ensure_ascii=True, sort_keys=True, indent=4)

        if not loaded:
            raise RuntimeError('Config created')


config = Config()
