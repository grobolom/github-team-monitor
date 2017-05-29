import os

LOG_LEVEL = os.environ.get('LOG_LEVEL', 'DEBUG')
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'console': {
            'format': '[%(asctime)s][%(levelname)s] %(name)s '
                      '%(filename)s:%(funcName)s:%(lineno)d | %(message)s',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'console',
        },
    },
    'loggers': {
        'main': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False
        },
    }
}

TOKEN = os.environ.get('GITHUB_TOKEN', '66d9528f377307629fd1dbff70e1b64aeaa90dac')

ORGS_TO_TRACK = os.environ.get('ORGS', 'HearstCorp,Hearst-Hatchery,HearstDigitalStudios').split(',')

RUN_SCHEDULER = os.environ.get('RUN_SCHEDULER', 'False') == 'True'


# config for the main Flask app object
class FlaskBaseConfig(object):
    SCHEDULER_JOBS = [
        {
            'id': 'update',
            'func': 'scrounger:update',
            'trigger': 'interval',
            'minutes': 15,
        }
    ]
    SCHEDULER_API_ENABLED = True
    SCHEDULER_TIMEZONE = "America/New_York"

    DEBUG = os.environ.get('DEBUG', True)
    DB_NAME = os.environ.get('DB_NAME', 'postgres')
    DB_USER = os.environ.get('DB_USER', 'postgres')
    DB_PASS = os.environ.get('DB_PASS', 'postgres')
    DB_SERVICE = os.environ.get('DB_SERVICE', 'postgres')
    DB_PORT = os.environ.get('DB_PORT', '5432')

    SQLALCHEMY_DATABASE_URI = 'postgresql://{0}:{1}@{2}:{3}/{4}'.format(
        DB_USER, DB_PASS, DB_SERVICE, DB_PORT, DB_NAME
    )
