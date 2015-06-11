from instagram.client import InstagramAPI
from instagram.bind import InstagramAPIError
import settings
import calendar
import re

from db import db, Photo, Tag, PhotoTag

pattern = re.compile(u'[^\u0000-\uD7FF\uE000-\uFFFF]', re.UNICODE)


def grab_photos(ista_step, lat, long):
    result = []

    period_start = settings.period['start']

    max_time = settings.period['end']

    while max_time > period_start:
        media = api.media_search(
            lat=settings.street['points'][0][0],
            lng=settings.street['points'][0][1],
            distance=settings.street_weight,
            max_timestamp=calendar.timegm(max_time.timetuple()),
            count=100
        )

        if len(media) == 0: break

        for m in media:
            if m.created_time > period_start: result.append(m)

        max_time = media[-1].created_time

    return result


def save_photos(insta_step, photos):
    for media in photos:
        photo = Photo.get_or_create(
            insta_id = media.id,
            thumb = media.get_thumbnail_url(),
            url = media.link,
            username = media.user.username,
            insta_filter = media.filter,
            date = media.created_time,
            longitude = media.location.point.longitude,
            latitude = media.location.point.latitude,
            insta_step = insta_step,
        )

        print dir(media)
        for t in media.tags:
            tag = Tag.get_or_create(name = pattern.sub('', t.name))

            print 'create tag'
            PhotoTag.get_or_create(tag=tag, photo=photo)


if __name__ == '__main__':
    api = InstagramAPI(**settings.insta_auth)

    step = 0
    all_way = sum(settings.street['distances'])
    way = 0

    all_way = 1

    lat = settings.street['points'][0][0]
    lng = settings.street['points'][0][1]

    while way < all_way:
        try:
            photos = grab_photos(0, lat, lng)
        except InstagramAPIError as ex:
            print 'Last step: %i' % step
            break

        save_photos(0, photos)
        way += settings.insta_step
