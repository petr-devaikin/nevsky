define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
    var container = d3.select('.m-map');

    var ZOOM = 16;

    var map;

    function drawBg(data) {
        var mapCentre = new google.maps.LatLng(51.523663, -0.076783);

        var mapStyles = [
            { elementType: 'labels', stylers: [{ visibility: 'off' }], },
            { featureType: 'landscape', stylers: [{ lightness: 100 }], },
            { featureType: 'poi', stylers: [{ visibility: 'off' }], },
            {
                elementType: 'geometry.fill',
                featureType: 'poi.park',
                stylers: [{ visibility: 'on' }, { lightness: 90 }, { saturation: -100 }],
            },
            { featureType: 'road', stylers: [{ saturation: -100, lightness: -90 }], },
            {
                elementType: 'geometry.stroke',
                featureType: 'road.arterial',
                stylers: [{ visibility: 'on' }],
            },
            { featureType: 'road.highway', stylers: [{ lightness: 60 }], },
            { featureType: 'transit', stylers: [{ visibility: 'off' }], },
            { featureType: 'water', stylers: [{ lightness: 50 }], },
        ];

        var styledMap = new google.maps.StyledMapType(mapStyles, {name: "Styled Map"});

        var mapOptions = {
            center: mapCentre,
            zoom: ZOOM,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
            },
            disableDefaultUI: true,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        };

        map = new google.maps.Map(document.querySelector(".m-map__bg"), mapOptions);

        var overlay = new google.maps.OverlayView();
        overlay.draw = function() {};
        overlay.setMap(map);

        google.maps.event.addListenerOnce(map, "idle", onMapLoaded);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        function onMapLoaded() {
            var mapCanvasProjection = overlay.getProjection();
            /*var north = new google.maps.LatLng(MAX_LATITUDE, (MIN_LONGITUDE + MAX_LONGITUDE) / 2),
                south = new google.maps.LatLng(MIN_LATITUDE, (MIN_LONGITUDE + MAX_LONGITUDE) / 2),
                west = new google.maps.LatLng((MAX_LATITUDE + MIN_LATITUDE) / 2, MIN_LONGITUDE),
                east = new google.maps.LatLng((MAX_LATITUDE + MIN_LATITUDE) / 2, MAX_LONGITUDE);

            var northPoint = mapCanvasProjection.fromLatLngToDivPixel(north),
                southPoint = mapCanvasProjection.fromLatLngToDivPixel(south),
                westPoint = mapCanvasProjection.fromLatLngToDivPixel(west),
                eastPoint = mapCanvasProjection.fromLatLngToDivPixel(east);

            PIXELS_PER_LONGITUDE = (eastPoint.x - westPoint.x) / (MAX_LONGITUDE - MIN_LONGITUDE);
            PIXELS_PER_LATITUDE = (southPoint.y - northPoint.y) / (MAX_LATITUDE - MIN_LATITUDE);*/

            //set_full_map_size();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(mapCentre);

            var point1 = new google.maps.LatLng(51.515820169, 0.071244092);
            var p1 = mapCanvasProjection.fromLatLngToDivPixel(mapCentre);
            console.log(p1);

            drawData(data, mapCanvasProjection);
        }
    }


    function drawData(data, gProjection) {
        console.log('Map: start');
        var counter = 0;

        var positions = {}

        for (var i = 0; i < data.length; i++) {
            data[i].latlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
            data[i].position = gProjection.fromLatLngToDivPixel(data[i].latlng);

            var key = data[i].position.x + ',' + data[i].position.y;
            if (positions[key] === undefined)
                positions[key] = 0;

            data[i].position.y -= 3 * (Math.floor(positions[key] / 10));
            data[i].position.x += 3 * (positions[key] % 10);
            positions[key]++;
        }

        container
            .selectAll('.m-map__photo')
                .data(data)
            .enter().append('div')
                .classed('m-map__photo', true)
                .style('left', function(d) { return d.position.x + 'px'; })
                .style('top', function(d) { return d.position.y + 'px'; })
                .attr("longitude", function(d) { return d.longitude; })
                .attr("latitude", function(d) { return d.latitude; })
                //.style('background', function(d) { return d.main_color; })
                .on('mouseover', events.photoHover);
    }

    function draw(data) {
        drawBg(data);
        //drawData(data);
    }

    return {
        draw: draw,
    }
});
