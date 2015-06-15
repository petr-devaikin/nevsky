import json

from db import db, Photo, Tag, PhotoTag

steps = {}

if __name__ == '__main__':
    for photo in Photo.all():
        if not insta_step in steps:
            steps[insta_step] = []
        steps[insta_step].append(photo.to_dict())

    with open('data.json', 'w') as fp:
        json.dump(steps, fp)
