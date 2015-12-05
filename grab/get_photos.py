from instagram.client import InstagramAPI
from instagram.bind import InstagramAPIError
import settings
import calendar
import time
import re
import peewee

from db import db, Photo, Tag, PhotoTag

pattern = re.compile(u'[^\u0000-\uD7FF\uE000-\uFFFF]', re.UNICODE)


def grab_photos(lat, lng):
    period_start = settings.period['start']
    max_time = settings.period['end']

    while max_time > period_start:
        result = []
        print 'get photos %f %f %s' % (lat, lng, max_time)

        media = api.media_search(
            lat=lat,
            lng=lng,
            distance=settings.insta_radius,
            max_timestamp=time.mktime(max_time.timetuple()),
            count=100
        )

        if len(media) == 0: break

        save_photos(media)

        max_time = media[-1].created_time

    return result


def save_photos(photos):
    c = 0
    for media in photos:
        if media.created_time > settings.period['start'] and media.location.point != None:
            try:
                photo = Photo.create(
                    insta_id = media.id,
                    thumb = media.get_thumbnail_url(),
                    url = media.link,
                    username = media.user.username,
                    insta_filter = media.filter,
                    date = media.created_time,
                    longitude = media.location.point.longitude,
                    latitude = media.location.point.latitude,
                    message = media.caption,
                    like_count = media.like_count,
                    user_in_photo_count = len(media.users_in_photo)
                )
            except peewee.IntegrityError:
                pass
            else:
                if hasattr(media, 'tags'):
                    for t in media.tags:
                        tag, tag_created = Tag.get_or_create(name = pattern.sub('', t.name))
                        PhotoTag.get_or_create(tag=tag, photo=photo)
                    c += 1

    print 'New media: %d / %d' % (c, len(photos))



if __name__ == '__main__':
    api = InstagramAPI(**settings.insta_auth)

    try:
        photos = grab_photos(settings.insta_point[0], settings.insta_point[1])
    except InstagramAPIError as ex:
        print 'Instagram error'
