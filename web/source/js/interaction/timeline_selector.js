define(['lib/d3', 'interaction/updater', 'drawing/timelineb', 'constants'], function(d3, updater, timeline, constants) {
    var timelineContainer = d3.select('.m-timeline-b__photos');
    var startPoint = undefined;

    var timelineSelection = d3.select('.m-timeline-b__selection');
    var timelineSelectionLeft = d3.select('.m-timeline-b__selection__left');
    var timelineSelectionRight = d3.select('.m-timeline-b__selection__right');

    //timelineSelection.attr('transform', 'translate(50,0)');

    function hideSelection() {
        timelineSelection.style('display', 'none');
        updater.updateTimelineFilter(undefined);
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

        timelineSelectionLeft
            .attr('width', x1);

        timelineSelectionRight
            .attr('x', x2)
            .attr('width', constants.timeline.width);

        if (saveFilter !== undefined)
            updater.updateTimelineFilter(startDate, endDate);
    }

    function activate() {
        timelineContainer.on('mousedown', function() {
            d3.event.preventDefault();
            startPoint = d3.mouse(timelineContainer.node());
            timeline.hideHighlighter();
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
            timeline.hideHighlighter();
        });

        timelineContainer.on('mousemove', function() {
            d3.event.preventDefault();
            if (startPoint !== undefined)
                updateSelection();
            else
                timeline.highlightDay(timeline.getScale().invert(d3.mouse(timelineContainer.node())[0]));
        });
    }

    return {
        activate: activate,
    }
});
