define(['libs/d3', 'constants', 'drawing/basics'], function(d3, constants, basics) {
    function drawStreetView() {
        basics.streetContainer.selectAll('#streetLine line')
            .attr('x2', basics.scale(constants.streetLength));
        basics.streetContainer.selectAll('#streetLine rect')
            .attr('width', basics.scale(constants.streetLength));

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
        var group = obj.append('g');
        group.append('text')
            .classed('metro-sign', true)
            .text('M');
        group.append('text')
            .attr('x', 20)
            .classed('metro-name', true)
            .text(function(d) {return d.name; });

        group.attr('transform', 'translate(0,-15)')
    }
    

    function drawRiver(obj) {
        obj.append('line')
            .attr('x1', 0)
            .attr('y1', -40)
            .attr('x2', 0)
            .attr('y2', 40);
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