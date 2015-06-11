import datetime
import os

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

street_weight = 100 #meters

insta_step = 100 #meters
insta_radius = 70.711

period = {
    'start': datetime.datetime(2014, 6, 6),
    'end': datetime.datetime(2014, 6, 7),
}


insta_auth = {
    'client_id': os.environ['INSTA_ID'] if 'INSTA_ID' in os.environ else '2775c50391b44bf98054224e7a10f923',
    'client_secret': os.environ['INSTA_SECRET'],
}