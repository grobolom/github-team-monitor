from scrounger import db


class PullRequest(db.Model):
    __tablename__ = 'pull_requests'

    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.JSON, nullable=False)

    def __init__(self, data):
        self.data = data


class Team(db.Model):
    __tablename__ = 'teams'

    name = db.Column(db.Text, primary_key=True)
    members = db.Column(db.JSON, nullable=False)

    def __init__(self, name, members):
        self.name = name
        self.members = members