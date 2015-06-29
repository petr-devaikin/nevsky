import shutil
import requests
import os
from PIL import Image
import settings

from db import Photo

img_path = '../web/source/img/insta/%s.jpg'


def calc_color(photo):
    img = Image.open(img_path % photo.insta_id)
    img.thumbnail((1, 1))
    photo.color = '%d,%d,%d' % img.getpixel((0, 0))
    photo.save()


if __name__ == "__main__":
    counter = 0
    photos = list(Photo.select())
    for photo in photos:
        if not os.path.isfile(img_path % photo.insta_id):
            r = requests.get(photo.thumb, stream=True)
            if r.status_code == 200:
                with open(img_path % photo.insta_id, 'wb') as f:
                    r.raw.decode_content = True
                    shutil.copyfileobj(r.raw, f)
                calc_color(photo)
            else:
                photo.delete_instance()
                print 'Cannot download %s' % photo.insta_id
        elif photo.color == None:
            calc_color(photo)

        counter += 1
        if counter % 100 == 0:
            print '%d / %d' % (counter, len(photos))
