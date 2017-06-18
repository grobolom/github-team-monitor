from extensions import db, bcrypt


class PullRequest(db.Model):
    __tablename__ = 'pull_requests'

    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Text, nullable=False)
    data = db.Column(db.JSON, nullable=False)

    def __init__(self, author, data):
        self.author = author
        self.data = data


class Team(db.Model):
    __tablename__ = 'teams'

    name = db.Column(db.Text, primary_key=True)
    members = db.Column(db.JSON, nullable=False)

    def __init__(self, name, members):
        self.name = name
        self.members = members


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, email, password, admin=False):
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
        self.admin = admin

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def get_id(self):
        return self.id