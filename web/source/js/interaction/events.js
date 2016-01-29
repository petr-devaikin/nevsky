define(['lib/d3'],
        function(d3, map, preview, timeline) {
    var photoViewer = d3.select('m-photos__preview');

    d3.select('.m-photos__big__close').on('click', function() {
        event.preventDefault();
        clearSelection();
    });

    function photoHover(d) {
        photoViewer.style('background', 'url(' + d.thumb + ')');
    }

    function selectPhoto(datum) {
        var id = datum.id;
        clearSelection();

        // select preview
        //var photo = d3.selectAll(".m-photos__set__inner__photo")
        //    .filter(function(d) { return d.id == id; });
        //photo.classed('selected', true);
        d3.select('.m-photos__big').style('display', 'block');
        d3.select('.m-photos__big__photo').style('background', 'url(' + datum.img + ')');
        if (datum.tags.length > 0)
            d3.select('.m-photos__big__tags').html('#' + datum.tags.join(" #"));
        else
            d3.select('.m-photos__big__tags').html('');

        // select map
        var photo = d3.selectAll('.m-map__photos__location__inner__photo')
                .filter(function(d) { return d.id == id; });
        var location = d3.selectAll('.m-map__photos__location')
                .filter(function(d) { return d.x == photo.datum().position.x && d.y == photo.datum().position.y; });
        d3.select('.m-map__photo-selector')
            .style('opacity', 1)
            .style('top', (location.datum().y - parseFloat(location.style('height'))) + 'px')
            .style('left', location.datum().x + 'px')
            .style('width', location.style('width'))
            .style('height', location.style('height'));
        console.log('map ' + location.datum().x + ' ' + location.datum().y);


        // select timeline
        var photo = d3.selectAll('.m-timeline-b__photos__days__day__photo')
                .filter(function(d) { return d.id == id; });
        var date = new Date(photo.datum().date * 1000);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        d3.select('.m-timeline-b__photos__photo-selector')
            .style('opacity', 1)
            .attr('transform', 'translate(' + photo.attr('x') + ',0)');
        d3.select('.m-timeline-b__photos__photo-selector').select('text')
            .html(date.getDate() + '/' + (date.getMonth() + 1) + '/2015');
    }

    function clearSelection() {
        // clearpreview
        //d3.selectAll(".m-photos__set__inner__photo.selected")
        //    .classed('selected', false);
        d3.select('.m-photos__big').style('display', 'none');

        // clear map
        d3.select('.m-map__photo-selector')
            .style('opacity', 0);

        // clear timeline
        d3.select('.m-timeline-b__photos__photo-selector')
            .style('opacity', 0);

        d3.select('m-photo__big').style('display', 'none');
    }

    return {
        photoHover: photoHover,
        selectPhoto: selectPhoto,
        deselectPhoto: clearSelection
    }
});
