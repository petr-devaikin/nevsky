define(['lib/d3'], function(d3) {
    var photoViewer = d3.select('m-photos__preview');

    function photoHover(d) {
        photoViewer.style('background', 'url(' + d.thumb + ')');
    }

    return {
        photoHover: photoHover,
    }
});
