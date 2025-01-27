import json
import os
from logging import getLogger
from logging.config import dictConfig

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_apscheduler import APScheduler

from extensions import db
from settings import BaseConfig
from db.helpers import get_issues, get_teams, get_team_issues, get_new_prs, save_new_prs, save_team, drop_existing_prs

dictConfig(BaseConfig.LOGGING)
logger = getLogger('main')

app = Flask(__name__)
app.config.from_object(BaseConfig)
db.init_app(app)


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
            return save_team(request.get_json()), 200
        except Exception as e:
            return 'failed' + str(e), 400


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
    headers = {
        'Authorization': 'Bearer {}'.format(BaseConfig.TOKEN)
    }

    new_prs = get_new_prs(url, headers)
    drop_existing_prs()
    total = save_new_prs(new_prs)

    return 'updated {} prs'.format(total) , 200


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
