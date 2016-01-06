define(['lib/d3', 'constants', 'interaction/events'], function(d3, constants, events) {
    var container = d3.select('.m-map');
    var projection = d3.geo.mercator();
    projection
        .center([-0.084685, 51.529396])
        .translate([250, 250])
        .scale(400000);

    var ZOOM = 13;


    function drawBg() {
        var mapCentre = new google.maps.LatLng(51.529396, -0.084685);

        var mapStyles = [
            { elementType: 'labels', stylers: [{ visibility: 'off' }], },
            { elementType: 'geometry.stroke', stylers: [{ visibility: 'off' }], },
            { featureType: 'landscape', stylers: [{ lightness: 100 }], },
            { featureType: 'poi', stylers: [{ visibility: 'off' }], },
            {
                elementType: 'geometry.fill',
                featureType: 'poi.park',
                stylers: [{ visibility: 'on' }, { lightness: 90 }, { saturation: -100 }],
            },
            { featureType: 'road', stylers: [{ saturation: -100 }], },
            { featureType: 'road.local', stylers: [{ lightness: 60 }], },
            { featureType: 'road.arterial', stylers: [{ lightness: 60 }], },
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

        var map = new google.maps.Map(document.querySelector(".m-map__bg"), mapOptions);

        var overlay = new google.maps.OverlayView();
        overlay.draw = function() {};
        overlay.setMap(map);

        google.maps.event.addListenerOnce(map, "idle", onMapLoaded);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        function onMapLoaded() {
            /*var north = new google.maps.LatLng(MAX_LATITUDE, (MIN_LONGITUDE + MAX_LONGITUDE) / 2),
                south = new google.maps.LatLng(MIN_LATITUDE, (MIN_LONGITUDE + MAX_LONGITUDE) / 2),
                west = new google.maps.LatLng((MAX_LATITUDE + MIN_LATITUDE) / 2, MIN_LONGITUDE),
                east = new google.maps.LatLng((MAX_LATITUDE + MIN_LATITUDE) / 2, MAX_LONGITUDE);

            var mapCanvasProjection = overlay.getProjection();
            var northPoint = mapCanvasProjection.fromLatLngToDivPixel(north),
                southPoint = mapCanvasProjection.fromLatLngToDivPixel(south),
                westPoint = mapCanvasProjection.fromLatLngToDivPixel(west),
                eastPoint = mapCanvasProjection.fromLatLngToDivPixel(east);

            PIXELS_PER_LONGITUDE = (eastPoint.x - westPoint.x) / (MAX_LONGITUDE - MIN_LONGITUDE);
            PIXELS_PER_LATITUDE = (southPoint.y - northPoint.y) / (MAX_LATITUDE - MIN_LATITUDE);*/

            //set_full_map_size();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(mapCentre);
        }
    }


    function drawData(data) {
        console.log('Map: start');

        container
            .selectAll('.m-map__photo')
                .data(data)
            .enter().append('div')
                .classed('m-map__photo', true)
                .style('left', function(d) { return projection([d.longitude, d.latitude])[0] + 'px'; })
                .style('top', function(d) { return projection([d.longitude, d.latitude])[1] + 'px'; })
                .attr("longitude", function(d) { return d.longitude; })
                .attr("latitude", function(d) { return d.latitude; })
                .style('background', function(d) { return d.main_color; })
                .on('mouseover', events.photoHover);
    }

    function draw(data) {
        drawBg();
        drawData(data);
    }

    return {
        draw: draw,
    }
});
