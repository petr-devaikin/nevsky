define(['lib/d3', 'drawing/palette', 'drawing/map', 'drawing/timelineb'],
        function(d3, drawingPalette, drawingMap, drawingTimelineB) {
    return function() {
        d3.json("js/photos.json?v=" + (new Date()).getTime(), function(data) {
            drawingPalette.draw(data);
            // drawingTimeline.draw(data);
            drawingMap.draw(data);
            drawingTimelineB.draw(data);
        });
    }
})
