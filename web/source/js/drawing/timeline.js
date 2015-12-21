define(['lib/d3', 'constants'], function(d3, constants) {
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

        for (var i = 0; i < 365; i++) {
            days[i].sort(function (a, b) {
                var aColor = d3.rgb('rgb(' + a.main_color + ')'),
                    bColor = d3.rgb('rgb(' + b.main_color + ')');

                return aColor.hsl().h === NaN || bColor.hsl().h - aColor.hsl().h;
            });
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
                .style('background', function (d) { return 'rgb(' + d.main_color + ')'; });

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
