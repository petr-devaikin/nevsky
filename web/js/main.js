define(['libs/d3', 'drawing/street', 'drawing/steps'], function(d3, drawingStreet, drawingSteps) {
    return function() {
        var map = d3.select('#streetMap');

        d3.json("js/data.json", function(data) { 

            var steps = [];
            for (var s in data)
                steps[s] = data[s];

            console.log(steps);
            return;
            map.selectAll('.step')
                    .data(steps)
                .enter()
                    .append('div')
                    .classed('step', true)
                    .text(function(d) { return d.length; });
        });

        drawingStreet.draw();
        drawingSteps.draw();
    }
})