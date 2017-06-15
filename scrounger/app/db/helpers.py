import json
from datetime import datetime, timedelta
from logging import getLogger
from time import strptime

import requests

from db.models import PullRequest, Team
from extensions import db
from graphql import QUERY, flatten_response
from settings import BaseConfig

logger = getLogger('main')

def get_issues():
    return [item.data for item in PullRequest.query.all()]


def get_teams():
    return [{'name': item.name, 'members': item.members} for item in Team.query.all()]


def get_team_issues(name):
    team = Team.query.filter_by(name=name).first()
    members = team.members

    prs = [item.data for item in db.session.query(PullRequest).filter(
        PullRequest.author.in_(members)
    )]
    return prs


def save_new_prs(new_prs):
    # filter out PRs that are greater than 90 days old
    for pr in new_prs.values():
        issue_time = pr['updated_at']
        parsed_time = datetime(*(strptime(issue_time, BaseConfig.TIMESTAMP_FORMAT))[:6])
        if datetime.now() - parsed_time < timedelta(days=90):
            new_pr = PullRequest(pr['user']['login'], pr)
            db.session.add(new_pr)

    db.session.commit()

    return len(new_prs.values())


def get_new_prs(url, headers):
    new_prs = {}
    for org in BaseConfig.ORGS_TO_TRACK:
        # using a % string interpolation here because our query has {} in it already
        q = {"query": (QUERY % (org,)).strip()}
        r = requests.post(url, headers=headers, data=json.dumps(q))
        resp = flatten_response(r.json())

        logger.debug('found {} issues for {}'.format(len(resp), org))
        new_prs.update(resp)
    return new_prs


def save_team(js):
    team = Team(js['name'], js['members'])

    db.session.merge(team)
    db.session.commit()

    return 'success'


def drop_existing_prs():
    logger.debug('dropping all issues and updating')
    deleted = PullRequest.query.delete()
    logger.debug('deleted {} pull requests'.format(deleted))
    return deleted