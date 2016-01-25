define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
  var container = d3.select('.m-timeline-b');

  

  function drawData(data) {
    //Width and height

            var margin = {top: 20, right: 80, bottom: 30, left: 50},
                width = 730 ,
                height = 200 - margin.top - margin.bottom;
                squareSize = 2;

            var parseDate = d3.time.format("%Y%m%d").parse;
                        
            //Create scale functions
            var zero = new Date(2015, 0, 1, 0, 0, 0, 0);

            var xScale = d3.time.scale()
                                .domain([zero, new Date(2016, 0, 1)])
                                .range([0, width]);                     
            //Define X axis
            var xAxis = d3.svg.axis()
                              .scale(xScale)
                              .orient("bottom")
                              .ticks(d3.time.month, 1);

            //Create SVG element
            var svg = container
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var days = [];

            for (var i = 0; i < 365; i++){
                days[i] = [];
            }

        
//puts the data into  days[], ordered by days, each number represents a day of the year
        for (var i = 0; i < data.length; i++) {
            var timeDiff = data[i].date * 1000 - zero.getTime();
            data[i].diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
            days[data[i].diffDays].push(data[i]);

        }
        //sort by hue for each day in part 
        for (var i = 0; i < 365; i++) {
            days[i].sort(function (a, b) {
                var aColor = d3.rgb(a.main_color),
                    bColor = d3.rgb(b.main_color);

                return aColor.hsl().h === NaN || bColor.hsl().h - aColor.hsl().h;
            });
        }

        //creates the div that contains the day square (X axis)
        var days = svg.selectAll('.day')
                            .data(days)
                            .enter()
                            .append('g')
                            .classed('day', true);
        var photoSquare = days.selectAll('rect')
                            .data(function(d) { return d; })
                            .enter()
                            .append('rect')
                            .attr("x", function(d, i) {return d.diffDays * squareSize; })
                            .attr("y", function(d,i) {return height -5 - i * squareSize;}) 
                            .attr("height", squareSize )
                            .attr("width", squareSize)
                            .style("fill", function(d) { return d.main_color; }) ;
                
            //Create X axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

    }

    function draw(data) {
        drawData(data);
    }

    return {
        draw: draw,
    }
});
