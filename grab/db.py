from peewee import *
import calendar
import pytz
import settings

db = SqliteDatabase('pictures.db')

class Photo(Model):
    insta_id = CharField(unique=True)
    thumb = CharField(unique=True)
    url = CharField(unique=True)
    username = CharField()
    insta_filter = CharField()
    date = DateTimeField()

    color = CharField(null=True)

    longitude = DoubleField()
    latitude = DoubleField()

    insta_step = IntegerField()

    def to_dict(self):
        return {
            'id': self.insta_id,
            'color': self.color.split(','),
            'thumb': self.thumb,
            'url': self.url,
            'date': calendar.timegm(self.date.timetuple()),
        }

    class Meta:
        database = db


class Tag(Model):
    name = CharField(unique=True)

    class Meta:
        database = db


class PhotoTag(Model):
    photo = ForeignKeyField(Photo, related_name='tags')
    tag = ForeignKeyField(Tag, related_name='photos')
    
    class Meta:
        database = db
        indexes = (
            (('photo', 'tag'), True),
        )


if __name__ == '__main__':
    Photo.create_table()
    Tag.create_table()
    PhotoTag.create_table()
    print('Db created')