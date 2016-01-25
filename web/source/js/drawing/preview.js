define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
  var container = d3.select('.m-photos__preview');

  function drawData(data){
  	var photos = container.selectAll(".photo")
  							.data(data.slice(10,100))
  							.enter()
  							.append("div")
  							.classed("photo", true)
  							.style('background', function(d) { return 'url(' + d.thumb + ')';});

 	 }

    function draw(data) {
        drawData(data);
    }

    return {
        draw: draw,
    }
});