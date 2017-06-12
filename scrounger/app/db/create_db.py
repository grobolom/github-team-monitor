from flask import Flask
from extensions import db
from settings import BaseConfig

app = Flask(__name__)
app.config.config_from_object(BaseConfig)
db.init_app(app)

db.drop_all()
db.create_all()