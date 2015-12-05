from flask import Flask, request, render_template

from db import Photo, Tag, PhotoTag
from peewee import fn, JOIN


app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('application.cfg', silent=True)


@app.route('/')
def index():
    cnt = fn.Count(PhotoTag.id)
    tags = Tag.select(Tag, cnt.alias('count'))
    tags = tags.join(PhotoTag).group_by(Tag).order_by(cnt.desc())

    empty = Photo.select(Photo, cnt).join(PhotoTag, JOIN.LEFT_OUTER).group_by(Photo)
    empty = empty.having(cnt == 0).count()

    return render_template('tags.html', tags=tags, empty=empty)

@app.route('/tag/')
@app.route('/tag/<hashtag_id>')
def photos(hashtag_id=None):
    if hashtag_id == None:
        tag_name = None
        cnt = fn.Count(PhotoTag.id)
        photos = Photo.select(Photo, cnt).join(PhotoTag, JOIN.LEFT_OUTER).group_by(Photo)
        photos = photos.having(cnt == 0)
    else:
        hashtag = Tag.get(Tag.id == hashtag_id)
        tag_name = hashtag.name
        photos = hashtag.photos
    return render_template('photos.html', tag=tag_name, photos=photos)

@app.route('/clean')
def clean():
    n = 0
    for pt in PhotoTag.select():
        try:
            p = pt.photo
        except Photo.DoesNotExist:
            pt.delete_instance()
            n += 1
    return 'Claened: ' + str(n)



if __name__ == '__main__':
    app.run(debug=False)
