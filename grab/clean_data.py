import os

from db import Photo, PhotoTag, Tag

img_path = 'data/img/%s.jpg'

save_tags = [
    312, #streetart
    258, #art
    425, #graffiti
    188, #urbanart
    186, #streetartlondon
    187, #streetartistry
    1234, #sprayart,
    2264, #wallart
    1230, #urbanwalls
    1237, #graffitiart,
    227, #streetphotography
    1228, #streetarteverywhere
    183, #londonstreetart
    2262, #streetartuk
    1967, #shoreditchstreetart
    1975, #graffitilondon
    4085, #murales
]

if __name__ == "__main__":
    n_photos = 0
    n_tags = 0
    n = 0
    for p in Photo.select():
        n += 1
        if n % 100 == 0:
            print 'processed: ' + str(n)
            print 'Removed photos: ' + str(n_photos)
            print 'Removed tags: ' + str(n_tags)

        if p.tags.count() == 0:
            continue
        for pt in p.tags:
            if pt.tag.id in save_tags:
                break
        else:
            n_photos += 1
            for pt in p.tags:
                if pt.tag.photos.count() == 1:
                    n_tags += 1
                    pt.tag.delete_instance()
                pt.delete_instance()
            p.delete_instance()

    print '==================='
    print 'Removed photos: ' + str(n_photos)
    print 'Removed tags: ' + str(n_tags)


