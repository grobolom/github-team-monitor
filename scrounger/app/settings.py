import os

class BaseConfig(object):
    # logging stuff
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

    # github-related settings
    TOKEN = os.environ.get('GITHUB_TOKEN', '66d9528f377307629fd1dbff70e1b64aeaa90dac')
    ORGS_TO_TRACK = os.environ.get('ORGS', 'HearstCorp,Hearst-Hatchery,HearstDigitalStudios').split(',')
    TIMESTAMP_FORMAT = '%Y-%m-%dT%H:%M:%SZ'

    # scheduler settings
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
    RUN_SCHEDULER = os.environ.get('RUN_SCHEDULER', 'False') == 'True'

    # postgres db settings
    DB_NAME    = os.environ.get('DB_NAME', 'postgres')
    DB_USER    = os.environ.get('DB_USER', 'admin')
    DB_PASS    = os.environ.get('DB_PASS', 'admin')
    DB_SERVICE = os.environ.get('DB_SERVICE', 'postgres')
    DB_PORT    = os.environ.get('DB_PORT', '5432')
    SQLALCHEMY_DATABASE_URI = 'postgresql://{0}:{1}@{2}:{3}/{4}'.format(
        DB_USER, DB_PASS, DB_SERVICE, DB_PORT, DB_NAME
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False