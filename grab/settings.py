import datetime
import os
import secret
import pytz

street = {
    'points': [
        [59.937035, 30.312616],
        [59.930421, 30.365931],
        [59.923473, 30.385532]
    ],
    'distances': [
        3060.0,
        1338.0
    ],
}

street_width = 100 #meters

insta_step = 100 #meters
insta_radius = 70.711

timezone = pytz.timezone('Europe/Moscow')

period = {
    'start': datetime.datetime(2014, 6, 6),
    'end': datetime.datetime(2014, 6, 8),
}


insta_auth = {
    'client_id': os.environ['INSTA_ID'] if 'INSTA_ID' in os.environ else secret.insta_id,
    'client_secret': os.environ['INSTA_SECRET'] if 'INSTA_SECRET' in os.environ else secret.insta_secret,
}