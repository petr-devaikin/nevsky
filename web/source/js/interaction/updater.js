define(['lib/d3', 'drawing/timelineb', 'drawing/map'], function(d3, timeline, map) {
    var originalData = [];

    var mapFilter = undefined;

    function update() {
        var mapData = originalData;
        var timelineData = originalData;
        var photosData = originalData;


        if (mapFilter !== undefined && mapFilter.width > 0 && mapFilter.height > 0) {
            // filterByMap

            timelineData = timelineData.filter(function(d) {
                return d.position.x >= mapFilter.x && d.position.x <= mapFilter.x + mapFilter.width &&
                    d.position.y >= mapFilter.y && d.position.y <= mapFilter.y + mapFilter.height;
            });
        }

        map.draw(mapData);
        timeline.draw(timelineData);
    }

    function setOriginalData(data) {
        originalData = data;

        update();
    }

    function updateMapFilter(x, y, width, height) {
        if (x === undefined)
            mapFilter = undefined;
        else
            mapFilter = {
                x: x,
                y: y,
                width: width,
                height: height
            }

        update();
    }

    return {
        setOriginalData: setOriginalData,
        updateMapFilter: updateMapFilter
    }
});
