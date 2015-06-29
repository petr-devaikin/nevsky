define(['libs/d3', 'constants', 'drawing/basics'], function(d3, constants, basics) {
    function drawSteps() {
        var steps = [];
        for (var i = 0; i < constants.streetLength / constants.stepLength; i++)
            steps.push(i);

        var streetSteps = basics.streetContainer.select('#steps').selectAll('.step')
                .data(steps)
            .enter().append('g')
                .classed('step', true)
                .attr('transform', function(g) {
                    return 'translate(' + basics.scale(g * constants.stepLength) + ',0)';
                });

        streetSteps.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', constants.stepLength / constants.streetLength * constants.streetWidth)
            .attr('height', 100);


        var allPhotosSteps = basics.allPhotosContainer.selectAll('.day').append('div')
                .classed('step', true);
        allPhotosSteps.data(steps);
        

        d3.selectAll('.step')
            .on('mouseover', function(d) {
                d3.selectAll('.step').filter(function(f) { return d == f; }).classed('hovered', true);
            })
            .on('mouseout', function(d) {
                d3.selectAll('.step').filter(function(f) { return d == f; }).classed('hovered', false);
            });
    }

    return {
        draw: drawSteps,
    }
});