import json
import os
from logging import getLogger
from logging.config import dictConfig

import requests
from bson.json_util import dumps
from flask import Flask, request
from flask_apscheduler import APScheduler

from graphql import query, flatten_response
from settings import LOGGING, ORGS_TO_TRACK, TOKEN, RUN_SCHEDULER, FlaskBaseConfig


dictConfig(LOGGING)
app = Flask(__name__)
logger = getLogger('main')


@app.route('/issues')
def issues():
    items = [item for item in db.gitdb.everything.find()]

    return dumps(items), 200, {'Content-Type': 'application/json'}


@app.route('/teams', methods=['GET', 'POST'])
def teams():
    if request.method == 'GET':
        _items = db.gitdb.teams.find()
        items = [item for item in _items]

        headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }

        return dumps(items), 200, headers
    else:
        try:
            js = request.get_json()
            team = {
                'name': js['name'],
                'members': js['members']
            }
            db.gitdb.teams.update_one({'name': js['name']}, {"$set": team}, True)
        except Exception as e:
            return str(e)
    return '?', 200


@app.route('/teams/<name>/issues')
def teams_issues(name):
    _team = db.gitdb.teams.find_one({'name': name})
    _items = db.gitdb.everything.find({'user.login': {'$in': _team['members']}})

    items = [item for item in _items]

    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }

    return dumps(items), 200, headers


@app.route('/update')
def update():

    url = 'https://api.github.com/graphql'
    headers = {'Authorization': 'Bearer {}'.format(TOKEN)}

    new_issues = {}
    for org in ORGS_TO_TRACK:
        logger.debug('finding all issues in {}'.format(org))

        # using a % string interpolation here because our query has {} in it already
        q = {"query": (query % (org,)).strip()}
        r = requests.post(url, headers=headers, data=json.dumps(q))
        resp = flatten_response(r.json())

        logger.debug('found {} issues for {}'.format(len(resp), org))
        new_issues.update(resp)

    logger.debug('dropping all issues and updating')
    db.gitdb.everything.delete_many({})
    db.gitdb.everything.insert_many(list(new_issues.values()))

    return 'success'


@app.route('/healthcheck')
def healthcheck():
    return 'success', 200


if __name__ == "__main__":
    app.config.from_object(FlaskBaseConfig)

    if RUN_SCHEDULER:
        # this restricts the scheduler to running in the parent process
        if not app.debug or os.environ.get('WERKZEUG_RUN_MAIN') == 'true':
            logger.debug('starting scheduler')
            scheduler = APScheduler()
            scheduler.init_app(app)
            scheduler.start()

    app.run(host="0.0.0.0", port=5000, debug=True)
