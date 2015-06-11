from peewee import *

db = SqliteDatabase('pictures.db')

class Photo(Model):
    insta_id = CharField()
    thumb = CharField()
    url = CharField()
    username = CharField()
    insta_filter = CharField()
    date = DateTimeField()

    longitude = DoubleField()
    latitude = DoubleField()

    class Meta:
        database = db


class Tag(Model):
    name = CharField()

    class Meta:
        database = db


class PhotoTag(Model):
    photo = ForeignKeyField(Photo, related_name='tags')
    tag = ForeignKeyField(Tag, related_name='photos')


if __name__ == '__main__':
    Photo.create_table()
    Tag.create_table()
    PhotoTag.create_table()
    print('Db created')