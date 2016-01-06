import datetime
import os
import pytz

insta_point = [51.529396, -0.084685]

insta_radius = 1500

timezone = pytz.timezone('Europe/London')

#period = {
#    'start': datetime.datetime(2015, 1, 1),
#    'end': datetime.datetime(2015, 12, 9),
#}
period = {
    'start': datetime.datetime(2015, 12, 2),
    'end': datetime.datetime(2016, 1, 1),
}


insta_auth = {
    'client_id': os.environ['INSTA_ID'] if 'INSTA_ID' in os.environ else '',
    'client_secret': os.environ['INSTA_SECRET'] if 'INSTA_SECRET' in os.environ else ''
}
