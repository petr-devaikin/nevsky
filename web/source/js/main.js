
define(['lib/d3', 'drawing/palette', 'drawing/timelineb', 'drawing/map', 'interaction/map_selector', 'drawing/preview'],
        function(d3, drawingPalette, drawingTimelineB, drawingMap, mapSelector, drawingPhotos) {

    return function() {
        d3.json("js/photos.json?v=" + (new Date()).getTime(), function(data) {
            data.sort(function (a, b) {
                var aColor = d3.rgb(a.main_color),
                    bColor = d3.rgb(b.main_color);

                return aColor.hsl().h === NaN || bColor.hsl().h - aColor.hsl().h;
            });

            // drawingPalette.draw(data);
            // drawingTimeline.draw(data);
            drawingMap.draw(data);

            drawingTimelineB.draw(data);


            mapSelector.activate();
            drawingPhotos.draw(data);

        });
    }
})
