define(['libs/d3'], function(d3) {
    return function() {
        var map = d3.select('#streetMap');

        d3.json("js/data.json", function(data) { 

            var steps = [];
            for (var s in data)
                steps[s] = data[s];

            console.log(steps);

            map.selectAll('.step')
                    .data(steps)
                .enter()
                    .append('div')
                    .classed('step', true)
                    .text(function(d) { return d.length; });
        });
    }
})