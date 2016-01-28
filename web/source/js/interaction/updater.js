define(['lib/d3', 'drawing/timelineb', 'drawing/map', 'drawing/preview'], function(d3, timeline, map, preview) {
    var originalData = [];

    var mapFilter = undefined;
    var timelineFilter = undefined;

    function mapFilterFunc(d) {
        return d.position.x >= mapFilter.x && d.position.x <= mapFilter.x + mapFilter.width &&
            d.position.y >= mapFilter.y && d.position.y <= mapFilter.y + mapFilter.height;
    }

    function timelineFilterFunc(d) {
        if (d.date*1000 <= timelineFilter.end.getTime())
            console.log(d.date*1000 + ' ' + timelineFilter.start.getTime() + ' ' + timelineFilter.end.getTime());
        return d.date*1000 >= timelineFilter.start.getTime() && d.date*1000 <= timelineFilter.end.getTime();
    }

    function update() {
        var mapData = originalData;
        var timelineData = originalData;
        var photosData = originalData;


        if (mapFilter !== undefined && mapFilter.width > 0 && mapFilter.height > 0) {
            timelineData = timelineData.filter(mapFilterFunc);
            photosData = photosData.filter(mapFilterFunc);
        }

        console.log(mapFilter);
        console.log(timelineFilter);
        if (timelineFilter !== undefined && timelineFilter.end > timelineFilter.start) {
            mapData = mapData.filter(timelineFilterFunc);
            photosData = photosData.filter(timelineFilterFunc);
        }

        map.draw(mapData);
        timeline.draw(timelineData);
        preview.draw(photosData);
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

    function updateTimelineFilter(startDate, endDate) {
        if (startDate === undefined)
            timelineFilter = undefined;
        else
            timelineFilter = {
                start: startDate,
                end: endDate
            }

        update();
    }

    return {
        setOriginalData: setOriginalData,
        updateMapFilter: updateMapFilter,
        updateTimelineFilter: updateTimelineFilter
    }
});
