define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
    var container = d3.select('.m-map');
    var projection = d3.geo.mercator();
    projection
        .center([-0.084685, 51.529396])
        .translate([250, 250])
        .scale(400000);

    var zoomX = 10000,
        zoomY = 10000;

    function drawBg() {

    }


    function drawData(data) {
        console.log('Map: start');

        container
            .selectAll('.m-map__photo')
                .data(data)
            .enter().append('div')
                .classed('m-map__photo', true)
                .style('left', function(d) { return projection([d.longitude, d.latitude])[0] + 'px'; })
                .style('top', function(d) { return projection([d.longitude, d.latitude])[1] + 'px'; })
                .attr("longitude", function(d) { return d.longitude; })
                .attr("latitude", function(d) { return d.latitude; })
                .style('background', function(d) { return d.main_color; })
                .on('mouseover', events.photoHover);
    }

    function draw(data) {
        drawBg();
        drawData(data);
    }

    return {
        draw: draw,
    }
});
