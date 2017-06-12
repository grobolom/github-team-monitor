from db.models import PullRequest, Team
from settings import BaseConfig
from scrounger import db


def get_issues():
    return [item.data for item in PullRequest.query.all()]


def get_teams():
    items = [{'name': item.name, 'members': item.members} for item in Team.query.all()]
    return items


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
    try:
        team = Team(js['name'], js['members'])

        db.session.merge(team)
        db.session.commit()
    except Exception as e:
        raise Exception('failed to save team')