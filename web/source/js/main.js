define(['lib/d3', 'drawing/palette', 'drawing/timeline'], function(d3, drawingPalette, drawingTimeline) {
    return function() {
        d3.json("js/photos.json?v=" + (new Date()).getTime(), function(data) {
            drawingPalette.draw(data);
            drawingTimeline.draw(data);
        });
    }
})
