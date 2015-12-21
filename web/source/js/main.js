define(['lib/d3', 'drawing/palette', 'drawing/timeline', 'drawing/map'],
        function(d3, drawingPalette, drawingTimeline, drawingMap) {
    return function() {
        d3.json("js/photos.json?v=" + (new Date()).getTime(), function(data) {
            drawingPalette.draw(data);
            drawingTimeline.draw(data);
            drawingMap.draw(data);
        });
    }
})
