define(['lib/d3', 'constants'], function(d3, constants) {
    var container = d3.select('.m-map');

    var projection = d3.geo.mercator()
            .center([51.529396, -0.084685])
            .scale(150);

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
                .style('left', function(d) {
                    var p = projection([d.longitude, d.latitude]);
                    maxX = Math.max(maxX, p[0]);
                    maxY = Math.max(maxY, p[1]);
                    minX = Math.min(minX, p[0]);
                    minY = Math.min(minY, p[1]);
                    console.log(d.longitude);
                    console.log(p[0]);
                    return projection([d.longitude, d.latitude])[0] + 'px'; })
                .style('top', function(d) { return projection([d.longitude, d.latitude])[1] + 'px'; })
                .style('background', function(d) { return 'rgb(' + d.main_color + ')'; });

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
