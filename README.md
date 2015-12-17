# InfoViz Project
## Data
data: https://github.com/petr-devaikin/stritlife/blob/master/grab/data/photos.json

data structure:
```json
[
  {
    "id": "1231231223423_2343423423", // instagram id,
    "thumb": "http://...", // image thumb url,
    "url": "http://...", // url of photo page
    "date": 1449615364, // datetime in unix timestamp format
    "longitude": -0.0801677,
    "latitude": 51.5244331,
    "avg_color": "12,224,123", // average color RGB
    "main_color": "142,121,224", // dominant color RGB
    "palette": "12,32,232 211,3,122 32,103,43", // three colors from palette
    "username": "sexyuser", // author
    "like_count": 12, // number of likes
    "filter": "Crema", // photo filter name
    "message": "Hey guys!", // photo caption
    "tags": ["selfie", "london", ...] // array of hashtags
  }
  ...
]
```

## Links

D3: http://d3js.org/
