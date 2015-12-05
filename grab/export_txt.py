import json

from db import db, Photo, Tag, PhotoTag

steps = {}

if __name__ == '__main__':
    with open('data/data.txt', 'w') as fp:
        fp.write(Photo.string_header() + '\n')
        for photo in Photo.select():
            fp.write(photo.to_string().encode('utf8') + '\n')
            #photo.to_string() + '\n'
