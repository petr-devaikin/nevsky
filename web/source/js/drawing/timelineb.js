define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
    // var container = d3.select('.m-timeline-b');
 function drawData(data) {
    var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);


var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); });

var svg = d3.select(".m-timeline-b").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });
   
}
    function draw(data) {
        drawData(data);
    }

    return {
        draw: draw,
    }
});