FROM python:3.13.2

WORKDIR /usr/app
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./src src
ENV PYTHONPATH=/usr/app/src

ENV TZ="Europe/Moscow"
CMD [ "python", "src/main.py" ]
