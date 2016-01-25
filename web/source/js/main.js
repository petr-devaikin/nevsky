
define(['lib/d3', 'drawing/timelineb', 'drawing/map', 'interaction/map_selector', 'interaction/timeline_selector',
        'interaction/updater'],
        function(d3, drawingTimeline, drawingMap, mapSelector, timelineSelector, updater) {

    return function() {
        d3.json("js/photos.json?v=" + (new Date()).getTime(), function(data) {
            data.sort(function (a, b) {
                var aColor = d3.rgb(a.main_color),
                    bColor = d3.rgb(b.main_color);

                return aColor.hsl().h === NaN || bColor.hsl().h - aColor.hsl().h;
            });

            drawingTimeline.prepareData(data);
            drawingMap.prepareData(data, startDrawing);

            function startDrawing() {
                updater.setOriginalData(data);

                mapSelector.activate();
                timelineSelector.activate();
            }
        });
    }
})
