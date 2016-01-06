define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
    var container = d3.select('.m-map');

    var zoomX = 10000,
        zoomY = 10000;

    function drawBg() {

    }


    function drawData(data) {
        console.log('Map: start');

        var maxX = 0,
            maxY = 0,
            minX = 100000,
            minY = 100000;

        container
            .selectAll('.m-map__photo')
                .data(data)
            .enter().append('div')
                .classed('m-map__photo', true)
                .style('left', function(d) { return ((d.longitude + 0.084685) * zoomX + 250) + 'px'; })
                .style('top', function(d) { return ((d.latitude - 51.529396) * zoomY + 250) + 'px'; })
                .attr("longitude", function(d) { return d.longitude; })
                .attr("latitude", function(d) { return d.latitude; })
                .style('background', function(d) { return d.main_color; })
                .on('mouseover', events.photoHover);

        console.log(minX + ' - ' + maxX);
        console.log(minY + ' - ' + maxY);
        console.log('Map: done');
    }

    function draw(data) {
        drawBg();
        drawData(data);
    }

    return {
        draw: draw,
    }
});
