define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
    var container = d3.select('.m-photos__preview');

    function drawData(data){
        container.selectAll(".photo")
            .remove();

	    var photos = container.selectAll(".photo")
			    .data(data.slice(0,100), function(d) { return d.id; });

        photos.enter()
			.append("div")
			.classed("photo", true)
			.style('background', function(d) { return 'url(' + d.thumb + ')';});

   	}

    function prepareData() {

    }

    return {
        prepareData: prepareData,
        draw: drawData,
    }
});
