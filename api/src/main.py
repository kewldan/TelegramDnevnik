import sys
from contextlib import suppress

import sentry_sdk
import uvicorn

from config import config
from database import connect


async def main():
    await connect()
    server_config = uvicorn.Config('server:app', host='0.0.0.0', port=config.port, log_level='info',
                                   server_header=False)
    server = uvicorn.Server(server_config)
    await server.serve()


if __name__ == '__main__':
    sentry_sdk.init(
        dsn="https://55da7c4caea037aac119e2b727bd97d8@o954513.ingest.us.sentry.io/4509237787557888",
        send_default_pii=True,
    )

    with suppress(KeyboardInterrupt):
        if sys.platform in ['linux', 'darwin']:
            import uvloop

            uvloop.run(main())
        else:
            import asyncio

            asyncio.run(main())
