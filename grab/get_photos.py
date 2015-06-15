from instagram.client import InstagramAPI
from instagram.bind import InstagramAPIError
import settings
import calendar
import re
import peewee

from db import db, Photo, Tag, PhotoTag

pattern = re.compile(u'[^\u0000-\uD7FF\uE000-\uFFFF]', re.UNICODE)


def grab_photos(lat, lng):
    result = []

    period_start = settings.period['start']

    max_time = settings.period['end']

    print 'get photos %f %f' % (lat, lng)

    while max_time > period_start:
        media = api.media_search(
            lat=lat,
            lng=lng,
            distance=settings.insta_radius,
            max_timestamp=calendar.timegm(max_time.timetuple()),
            count=100
        )

        if len(media) == 0: break

        for m in media:
            if m.created_time > period_start: result.append(m)

        max_time = media[-1].created_time

    return result


def save_photos(insta_step, photos):
    c = 0
    for media in photos:
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
                insta_step = insta_step,
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

    step = 0

    all_way = sum(settings.street['distances'])
    way = 0

    def setNewSection(section):
        lat = settings.street['points'][section][0]
        lng = settings.street['points'][section][1]
        lat_step = settings.street['points'][section + 1][0] - settings.street['points'][section][0]
        lng_step = settings.street['points'][section + 1][1] - settings.street['points'][section][1]
        lat_step *= settings.insta_step / settings.street['distances'][section]
        lng_step *= settings.insta_step / settings.street['distances'][section]

        return lat, lng, lat_step, lng_step

    section = 0
    lat, lng, lat_step, lng_step = setNewSection(section)

    while way < all_way:
        print 'Step %d' % step
        print 'Section %d' % section
        print 'Way %f' % way

        if way > sum(settings.street['distances'][:section + 1]):
            section += 1
            lat, lng, lat_step, lng_step = setNewSection(section)

        try:
            photos = grab_photos(lat, lng)
        except InstagramAPIError as ex:
            print 'Instagram error. Last step: %i' % step
            break

        save_photos(step, photos)

        step += 1
        way += settings.insta_step
        lat += lat_step
        lng += lng_step
