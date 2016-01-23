define(['lib/d3'], function(d3) {
    var mapContainer = d3.select('.m-map');
    var startPoint = undefined;

    var mapSelection = d3.select('.m-map__selection');

    function hideSelection() {
        mapSelection.style('display', 'none');
    }

    function showSelection() {
        mapSelection.style('display', 'block');
    }

    function updateSelection() {
        var endPoint = d3.mouse(mapContainer.node());

        var x1 = Math.min(startPoint[0], endPoint[0]),
            y1 = Math.min(startPoint[1], endPoint[1]),
            x2 = Math.max(startPoint[0], endPoint[0]),
            y2 = Math.max(startPoint[1], endPoint[1]);

        if (x1 == x2 || y1 == y2) {
            hideSelection();
        }
        else {
            showSelection();
        }

        mapSelection
            .style('left', x1 + 'px')
            .style('top', y1 + 'px')
            .style('width', (x2 - x1) + 'px')
            .style('height', (y2 - y1) + 'px');
    }

    function activate() {
        mapContainer.on('mousedown', function() {
            d3.event.preventDefault();
            startPoint = d3.mouse(mapContainer.node());
        });

        mapContainer.on('mouseup', function() {
            d3.event.preventDefault();

            if (startPoint !== undefined) {
                updateSelection();
                startPoint = undefined;
            }
        });

        mapContainer.on('mouseleave', function() {
            d3.event.preventDefault();
            if (startPoint !== undefined) {
                startPoint = undefined;
                hideSelection();
            }
        });

        mapContainer.on('mousemove', function() {
            d3.event.preventDefault();
            if (startPoint !== undefined)
                updateSelection();
        });
    }


    return {
        activate: activate
    }
});
