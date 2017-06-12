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

dictConfig(BaseConfig.LOGGING)
logger = getLogger('main')

app = Flask(__name__)
app.config.from_object(BaseConfig)
db = SQLAlchemy(app)

from db.models import *


@app.route('/issues')
def issues():
    items = [item.data for item in PullRequest.query.all()]

    return json.dumps(items), 200, {'Content-Type': 'application/json'}


@app.route('/teams', methods=['GET', 'POST'])
def teams():
    if request.method == 'GET':
        items = [{'name': item.name, 'members': item.members} for item in Team.query.all()]

        headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }

        return json.dumps(items), 200, headers
    else:
        try:
            js = request.get_json()
            team = Team(js['name'], js['members'])

            db.session.merge(team)
            db.session.commit()
        except Exception as e:
            return str(e)
    return '?', 200


@app.route('/teams/<name>/issues')
def teams_issues(name):
    team = Team.query.filter_by(name=name).first()
    members = team.members

    prs = [item.data for item in db.session.query(PullRequest).filter(
        PullRequest.author.in_(members)
    )]

    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }

    return json.dumps(prs), 200, headers


@app.route('/update')
def update():

    url = 'https://api.github.com/graphql'
    headers = {'Authorization': 'Bearer {}'.format(BaseConfig.TOKEN)}

    new_prs = {}
    for org in BaseConfig.ORGS_TO_TRACK:
        logger.debug('finding all issues in {}'.format(org))

        # using a % string interpolation here because our query has {} in it already
        q = {"query": (QUERY % (org,)).strip()}
        r = requests.post(url, headers=headers, data=json.dumps(q))
        resp = flatten_response(r.json())

        logger.debug('found {} issues for {}'.format(len(resp), org))
        new_prs.update(resp)

    logger.debug('dropping all issues and updating')
    deleted = PullRequest.query.delete()
    logger.debug('deleted {} pull requests'.format(deleted))

    # filter out PRs that are greater than 90 days old
    for pr in new_prs.values():
        issue_time = pr['updated_at']
        parsed_time = datetime(*(strptime(issue_time, BaseConfig.TIMESTAMP_FORMAT))[:6])
        if datetime.now() - parsed_time < timedelta(days=90):
            new_pr = PullRequest(pr['user']['login'], pr)
            db.session.add(new_pr)

    db.session.commit()

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
