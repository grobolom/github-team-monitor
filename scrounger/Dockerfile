# build from python 3.6.1
FROM python:3.6.1

COPY . /app

WORKDIR /app

ENV PYTHONPATH $PYTHONPATH:/app/app

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ./bin/boot