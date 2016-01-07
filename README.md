# InfoViz Project
## Data
data: https://github.com/petr-devaikin/stritlife/blob/master/grab/data/photos.json

data structure:
```json
[
  {
    "id": "1231231223423_2343423423",                 // instagram id,
    "thumb": "https://...",                           // image thumb url,
    "img": "https://...",                           // full image url,
    "url": "https://...",                             // url of photo page
    "date": 1449615364,                               // datetime in unix timestamp format
    "longitude": -0.0801677,
    "latitude": 51.5244331,
    "avg_color": "rgb(12,224,123)",                        // average color RGB
    "main_color": "rgb(142,121,224)",                      // dominant color RGB
    "username": "sexyuser",                           // author
    "like_count": 12,                                 // number of likes
    "filter": "Crema",                                // photo filter name
    "message": "Hey guys!",                           // photo caption
    "tags": ["selfie", "london", "me", "streetart"]   // array of hashtags
  }
  ...
]
```

## Web

### Instalation

1. Install SASS http://sass-lang.com/install
2. Install node.js and npm https://docs.npmjs.com/getting-started/installing-node
3. To install all dependencies (packages for development) go to web/ and run
```
npm install
```

### Development

Go to web/ and run
```
gulp serve
```
web site will be opened in web browser.

Web page will be automatically updated if source code is changed. (If you add a new file, restart gulp)


### Links

D3: http://d3js.org/

Require.js: http://requirejs.org/

SASS: http://sass-lang.com/documentation/file.SASS_REFERENCE.html

