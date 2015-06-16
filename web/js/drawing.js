define(['libs/d3', 'constants'], function(d3, constants) {
    function drawStreet() {
        var scale = d3.scale.lineal()
            .domain([0, constants.streetLength])
            .range([0, 700]);

        var container = d3.select('#streetMap svg');
    }

    return {
        drawStreet: drawStreet,
    }
});