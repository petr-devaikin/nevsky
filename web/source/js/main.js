define(['lib/d3', 'drawing/palette'], function(d3, drawingPalette) {
    return function() {
        d3.json("js/photos.json?v=" + (new Date()).getTime(), function(data) {
            drawingPalette.draw(data);
        });
    }
})
