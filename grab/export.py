import json

from db import db, Photo, Tag, PhotoTag

steps = {}

if __name__ == '__main__':
    for photo in Photo.select():
        if not photo.insta_step in steps:
            steps[photo.insta_step] = []
        steps[photo.insta_step].append(photo.to_dict())

    with open('data.json', 'w') as fp:
        json.dump(steps, fp)
