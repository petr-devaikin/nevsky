define(['lib/d3', 'interaction/updater', 'drawing/timelineb', 'constants'], function(d3, updater, timeline, constants) {
    var timelineContainer = d3.select('.m-timeline-b__photos');
    var startPoint = undefined;

    var timelineSelection = d3.select('.m-timeline-b__selection');

    //timelineSelection.attr('transform', 'translate(50,0)');

    function hideSelection() {
        timelineSelection.style('display', 'none');
        updater.updateMapFilter(undefined);
    }

    function showSelection() {
        timelineSelection.style('display', 'block');
    }

    function updateSelection(saveFilter) {
        var endPoint = d3.mouse(timelineContainer.node());

        var x1 = Math.min(startPoint[0], endPoint[0]),
            x2 = Math.max(startPoint[0], endPoint[0]);

        if (x1 == x2 && saveFilter !== undefined ) {
            console.log('hide seleciton');
            hideSelection();
        }
        else {
            showSelection();
        }

        var startDate = timeline.getScale().invert(x1);
        var endDate = timeline.getScale().invert(x2);

        timelineSelection.select('rect')
            .attr('transform', 'translate(' + x1 + ',0)')
            .attr('width', (x2 - x1));

        if (saveFilter !== undefined)
            updater.updateTimelineFilter(startDate, endDate);
    }

    function activate() {
        timelineContainer.on('mousedown', function() {
            d3.event.preventDefault();
            startPoint = d3.mouse(timelineContainer.node());
        });

        timelineContainer.on('mouseup', function() {
            d3.event.preventDefault();

            if (startPoint !== undefined) {
                updateSelection(true);
                startPoint = undefined;
            }
        });

        timelineContainer.on('mouseleave', function() {
            d3.event.preventDefault();
            if (startPoint !== undefined) {
                startPoint = undefined;
                hideSelection();
            }
        });

        timelineContainer.on('mousemove', function() {
            d3.event.preventDefault();
            if (startPoint !== undefined)
                updateSelection();
        });
    }


    return {
        activate: activate
    }
});
