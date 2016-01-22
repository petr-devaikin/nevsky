define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
  var container = d3.select('.m-timeline-b');

  

  function drawData(data) {
    //Width and height

            var margin = {top: 20, right: 80, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var parseDate = d3.time.format("%Y%m%d").parse;
                        
            // data.forEach(function(d) {
            //     d.date = parseDate(d.date);
            // });
            //Create scale functions

            var xScale = d3.time.scale()
                                .domain([new Date(2015, 1, 1), new Date(2015, 12, 31)])
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

            var days = [];

            for (var i = 0; i < 365; i++){
                days[i] = [];
            }

        var zero = new Date(2015, 0, 1, 0, 0, 0, 0);
//puts the data into  days[], ordered by days, each number represents a day of the year
        for (var i = 0; i < data.length; i++) {
            var timeDiff = data[i].date * 1000 - zero.getTime();
            var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

            days[diffDays].push(data[i]);
            console.log(days[diffDays]);
        }

        //creates the div that contains the day square (X axis)
        var days = container
            .selectAll('.m-timeline__day')
                .data(days)
            .enter().append('div')
                .classed('m-timeline__day', true)
                .style('bottom', 500)
                .style('left', function(d,i) {return i + 3;} );
//creates the div that contains the color (y axis)
        days
            .selectAll('.m-timeline__day__photo')
                .data(function(d) { return d; })
            .enter().append('div')
                .classed('m-timeline__day__photo', true)
                .style('background', function (d) { return d.main_color; })
                .style()
                .on('mouseover', events.photoHover);
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
