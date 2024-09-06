from typing import Literal

from starlette.responses import JSONResponse

ResponseType = Literal['success', 'error']


class BaseResponse(JSONResponse):
    def __init__(self, response_type: ResponseType, data: dict[str, ...], status_code: int, **kwargs):
        super().__init__({'type': response_type, **data}, status_code, **kwargs)


class SuccessResponse(BaseResponse):
    def __init__(self, content: dict | list, status_code: int = 200, **kwargs) -> None:
        super().__init__('success', {'data': content}, status_code, **kwargs)


class ErrorResponse(BaseResponse):
    def __init__(self, message: str, status_code: int = 500, **kwargs) -> None:
        super().__init__('error', {'message': message}, status_code, **kwargs)
