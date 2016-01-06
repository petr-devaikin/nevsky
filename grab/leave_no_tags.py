import os
import shutil
import settings

from db import Photo,PhotoTag, Tag

new_path = 'data/no_tag/%s.jpg'

if __name__ == "__main__":
    n = 0
    removed = 0
    left = 0
    for p in Photo.select():
        n += 1
        if n % 100 == 0:
            print 'processed: ' + str(n)
            print 'removed: ' + str(removed)
            print 'left: ' + str(left)

        if p.tags.count() == 0:
            if not os.path.isfile(new_path % p.insta_id):
                for pt in p.tags:
                    if pt.tag.photos.count() == 1:
                        n_tags += 1
                        pt.tag.delete_instance()
                    pt.delete_instance()
                p.delete_instance()
                removed += 1
            else:
                left += 1

    print 'processed: ' + str(n)
    print 'removed: ' + str(removed)
    print 'left: ' + str(left)



