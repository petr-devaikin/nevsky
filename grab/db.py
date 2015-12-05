from peewee import *
import calendar
import pytz
import settings

db = SqliteDatabase('data/pictures.db')

class Photo(Model):
    insta_id = CharField(unique=True)
    thumb = CharField(unique=True)
    url = CharField(unique=True)
    username = CharField()
    insta_filter = CharField(null=True)
    date = DateTimeField()
    message = CharField(null=True)
    like_count = IntegerField()
    user_in_photo_count = IntegerField()

    color = CharField(null=True)

    longitude = DoubleField()
    latitude = DoubleField()

    def to_dict(self):
        return {
            'id': self.insta_id,
            'color': self.color.split(','),
            'thumb': self.thumb,
            'url': self.url,
            'date': calendar.timegm(self.date.timetuple()),
        }

    @staticmethod
    def string_header():
        return '\t'.join([
                'id',
                'date',
                'longitude',
                'latitude',
                'username',
                'filter',
                'likes',
                'tagged users',
                'tags',
                'caption',
                'thumb url',
                'img url',
            ])

    def to_string(self):
        return '\t'.join([
                self.insta_id,
                str(self.date),
                str(self.longitude),
                str(self.latitude),
                self.username,
                self.insta_filter,
                str(self.like_count),
                str(self.user_in_photo_count),
                ' '.join(self.tags_array()),
                self.message if self.message != None else '',
                self.thumb,
                self.url,
            ])

    def tags_array(self):
        result = []
        for tag in self.tags.select().join(Tag):
            result.append(tag.tag.name)
        return result

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
