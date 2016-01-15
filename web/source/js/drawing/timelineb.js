define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
  var container = d3.select('.m-timeline-b');

  

  function drawData(data) {
    //Width and height

            var margin = {top: 20, right: 80, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var parseDate = d3.time.format("%Y%m%d").parse;

             data.forEach(function(d) {
                d.date = parseDate(d.date);
            });
            
            //Create scale functions

            var  xScale= d3.time.scale()
                                .domain(d3.extent(data, function(d) { return d.date; }))
                                .range([0, width]);    
             
            //Define X axis
            var xAxis = d3.svg.axis()
                              .scale(xScale)
                              .orient("bottom");

            //Create SVG element
            var svg = container
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            //Create X axis
            svg.append("g")
                .call(xAxis);

    }

    function draw(data) {
        drawData(data);
    }

    return {
        draw: draw,
    }
});