from flask import Flask
from extensions import db
from settings import BaseConfig

from models import *

app = Flask(__name__)
app.config.from_object(BaseConfig)
db.init_app(app)

with app.app_context():
    db.drop_all()
    db.create_all()