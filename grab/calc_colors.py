from PIL import Image
from colorthief import ColorThief

from db import Photo,PhotoTag, Tag

img_path = 'data/img/%s.jpg'

if __name__ == "__main__":
    n = 0
    for p in Photo.select():
        n += 1
        if n % 100 == 0:
            print 'processed: ' + str(n)

        if p.avg_color == None:
            try:
                img = Image.open(img_path % p.insta_id)
                img.thumbnail((1, 1))
                p.avg_color = '%d,%d,%d' % img.getpixel((0, 0))
                p.save()
            except IOError:
                print 'CANNOT OPEN ' + p.insta_id
                p.delete_instance()

        if p.main_color == None:
            color_thief = ColorThief(img_path % p.insta_id)
            mc = color_thief.get_color(quality=1)
            clrs = color_thief.get_palette(color_count=2, quality=1) # 3 colors!
            p.main_color = '%d,%d,%d' % mc
            p.colors = ' '.join('%d,%d,%d' % c for c in clrs)
            p.save()




