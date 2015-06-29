define(['libs/d3', 'constants', 'drawing/basics'], function(d3, constants, basics) {
    function drawStreetView() {
        basics.streetContainer.selectAll('#streetLine line')
            .attr('x2', basics.scale(constants.streetLength));

        drawLandmark();
    }

    function drawLandmark() {
        var landmarks = basics.streetContainer.select('#landmarks').selectAll('.landmark')
                .data(constants.landmarks)
            .enter().append('g')
                .classed('landmark', true);

        landmarks.each(function(d) {
            var obj = d3.select(this);
            switch (d.type) {
                case 'street':
                    drawStreet(obj);
                    break;
                case 'metro':
                    drawMetro(obj);
                    break;
                case 'river':
                    drawRiver(obj);
                    break;
                case 'building':
                    drawBuilding(obj);
                    break;
                case 'park':
                    drawPark(obj);
                    break;
                case 'square':
                    drawSquare(obj);
                    break;
            }
            obj.classed(d.type, true);
            obj.attr('transform', 'translate(' + basics.scale(d.km) + ',0)');
        });
    }

    function drawStreet(obj) {
        obj.append('line')
            .attr('x1', 0)
            .attr('y1', -40)
            .attr('x2', 0)
            .attr('y2', 40);
    }
    

    function drawMetro(obj) {
        obj.append('text')
            .attr('y', 10)
            .text('M');
    }
    

    function drawRiver(obj) {
        obj.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 5)
            .attr('height', 20);
    }

    function drawBuilding(obj) {
        obj.append('rect')
            .attr('x', 0)
            .attr('y', 20)
            .attr('width', 10)
            .attr('height', 10);
    }

    function drawPark(obj) {
        obj.append('rect')
            .attr('x', 0)
            .attr('y', 20)
            .attr('width', 10)
            .attr('height', 10);
    }

    function drawSquare(obj) {
        obj.append('rect')
            .attr('x', 0)
            .attr('y', 20)
            .attr('width', 10)
            .attr('height', 10);
    }

    return {
        draw: drawStreetView,
    }
});