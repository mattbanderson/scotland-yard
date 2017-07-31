(function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWJhbmRlcnNvbjMiLCJhIjoiY2lscmNwbm91MDhxN3VobTFneGhscXdrOSJ9.v6i-0EYa3CW7icfo0a_Chw';
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [-0.171667, 51.521269], // starting position
      zoom: 13.5 // starting zoom
  });

  map.on('load', function () {
    map.addSource('stations', { type: 'geojson', data: './data/sy.json' });
    map.addLayer({
        "id": "stations",
        "type": "symbol",
        "source": "stations",
        "layout": {
            "icon-image": "rocket-15"
        }
    });

    map.addSource('routes', { type: 'geojson', data: './data/routes.geo.json' });
    map.addLayer({
        "id": "routes",
        "type": "line",
        "source": "routes",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
          'line-color': {
             'type': 'identity',
             'property': 'color'
          },
          "line-width": 4
        }
    });
  });
}());
