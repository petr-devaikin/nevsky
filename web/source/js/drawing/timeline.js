define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
    var container = d3.select('.m-timeline');

    function drawBg() {

    }

    function drawData(data) {
        console.log('Timeline: start');

        var days = [];
        for (var i = 0; i < 365; i++)
            days[i] = [];

        var zero = new Date(2015, 0, 1, 0, 0, 0, 0);

        for (var i = 0; i < data.length; i++) {
            var timeDiff = data[i].date * 1000 - zero.getTime();
            var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

            days[diffDays].push(data[i]);
        }

        var days = container
            .selectAll('.m-timeline__day')
                .data(days)
            .enter().append('div')
                .classed('m-timeline__day', true);

        days
            .selectAll('.m-timeline__day__photo')
                .data(function(d) { return d; })
            .enter().append('div')
                .classed('m-timeline__day__photo', true)
                .style('background', function (d) { return d.main_color; })
                .on('mouseover', events.photoHover);

        console.log('Timeline: done');
    }

    function draw(data) {
        drawBg();
        drawData(data);
    }

    return {
        draw: draw,
    }
});
