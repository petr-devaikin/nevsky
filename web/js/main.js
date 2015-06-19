define(['libs/d3', 'drawing/street', 'drawing/steps', 'drawing/photos'],
        function(d3, drawingStreet, drawingSteps, drawingPhotos) {
    return function() {
        var map = d3.select('#streetMap');

        d3.json("js/data.json?v=" + (new Date()).getTime(), function(data) { 
            var steps = [];
            for (var s in data)
                steps[s] = data[s];

            drawingPhotos.draw(steps);
            drawingSteps.draw();
        });

        drawingStreet.draw();
        drawingSteps.draw();
    }
})