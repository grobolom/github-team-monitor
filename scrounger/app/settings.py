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
