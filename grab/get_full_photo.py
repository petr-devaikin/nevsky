from instagram.client import InstagramAPI
from instagram.bind import InstagramAPIError
import settings
import calendar
import time
import re
import peewee

from db import db, Photo, Tag, PhotoTag


def update_photos():
    i = 0
    empty = 0
    for photo in Photo.select():
        i += 1
        if photo.colors == "":
            empty += 1
            for pt in list(photo.tags):
                pt.delete_instance()
            photo.delete_instance()

    print i
    print empty


if __name__ == '__main__':
    api = InstagramAPI(**settings.insta_auth)

    photos = update_photos()
