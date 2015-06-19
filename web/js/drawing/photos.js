define(['libs/d3', 'constants', 'drawing/basics'], function(d3, constants, basics) {
    function drawPhotos(data) {
        drawAllPhotos(data);
        drawHourPhotos(data);
    }

    function setDayParams(selection) {
        selection
            .classed('day', true)
            .style('left', function(g, i) {
                return basics.scale(i * constants.stepLength) + 'px';
            })
            .style('width', constants.stepLength / constants.streetLength * constants.streetWidth + 'px');
    }

    function setHourParams(selection) {
        selection
            .classed('hour', true);
    }

    function drawAllPhotos(data) {
        var allPhotosSteps = basics.allPhotosContainer.selectAll('.day')
                .data(data)
            .enter().append('div')
                .call(setDayParams);

        allPhotosSteps.selectAll('.smallPhoto')
                .data(function(d) { return d; })
            .enter().append('div')
                .classed('smallPhoto', true);
    }

    function drawHourPhotos(data) {
        var hourPhotosSteps = basics.hourPhotosContainer.selectAll('.day')
                .data(data)
            .enter().append('div')
                .call(setDayParams);

        hourPhotosSteps.each(function (d) {
            var hours = [];
            for (var i = 0; i < 24; i++) {
                hours[i] = d.filter(function(p) { return (new Date(p.date * 1000)).getHours() == i; });
            }
            console.log(hours);

            var hourBlocks = d3.select(this).selectAll('.hour')
                    .data(hours)
                .enter().append('div')
                    .call(setHourParams);

            hourBlocks.selectAll('.smallPhoto')
                    .data(function(d) { return d; })
                .enter().append('div')
                    .classed('smallPhoto', true);
        });
        
    }

    return {
        draw: drawPhotos,
    }
});