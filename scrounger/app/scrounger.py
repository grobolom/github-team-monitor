import json
import os
from logging import getLogger
from logging.config import dictConfig
from time import strptime
from datetime import datetime, timedelta

import requests
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_apscheduler import APScheduler

from graphql import QUERY, flatten_response
from settings import BaseConfig
from helpers import get_issues, get_teams, get_team_issues, get_new_prs, save_new_prs, save_team

dictConfig(BaseConfig.LOGGING)
logger = getLogger('main')

app = Flask(__name__)
app.config.from_object(BaseConfig)
db = SQLAlchemy(app)

from db.models import *


@app.route('/issues')
def issues():
    items = get_issues()

    return json.dumps(items), 200, {'Content-Type': 'application/json'}


@app.route('/teams', methods=['GET', 'POST'])
def teams():
    if request.method == 'GET':
        items = get_teams()

        headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }

        return json.dumps(items), 200, headers
    else:
        try:
            save_team(request.get_json())
        except Exception:
            return 'failed', 400


@app.route('/teams/<name>/issues')
def teams_issues(name):
    prs = get_team_issues(name)

    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }

    return json.dumps(prs), 200, headers


@app.route('/update')
def update():

    url = 'https://api.github.com/graphql'
    headers = {'Authorization': 'Bearer {}'.format(BaseConfig.TOKEN)}

    new_prs = get_new_prs(url, headers)

    logger.debug('dropping all issues and updating')
    deleted = PullRequest.query.delete()
    logger.debug('deleted {} pull requests'.format(deleted))

    save_new_prs(new_prs)

    return 'success'


@app.route('/healthcheck')
def healthcheck():
    return 'success', 200


if __name__ == "__main__":
    if BaseConfig.RUN_SCHEDULER:
        # this restricts the scheduler to running in the parent process
        if not app.debug or os.environ.get('WERKZEUG_RUN_MAIN') == 'true':
            logger.debug('starting scheduler')
            scheduler = APScheduler()
            scheduler.init_app(app)
            scheduler.start()

    app.run(host="0.0.0.0", port=5000, debug=True)
