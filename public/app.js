(function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWJhbmRlcnNvbjMiLCJhIjoiY2lscmNwbm91MDhxN3VobTFneGhscXdrOSJ9.v6i-0EYa3CW7icfo0a_Chw';
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [-0.171667, 51.521269], // starting position
      zoom: 13.5 // starting zoom
  });

  map.on('contextmenu', function (e) {
      document.getElementById('info').innerHTML = e.lngLat;
  });

  map.on('load', function () {

    map.loadImage('img/taxi.png', function(error, imgTaxi) {
      map.loadImage('img/bus.png', function(error, imgBus) {
        map.loadImage('img/underground.png', function(error, imgUnderground) {

          map.addSource('routes', { type: 'geojson', data: 'data/routes.geo.json' });
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
                "line-width": 4,
                "line-offset": {
                  "type": "identity",
                  "property": "offset"
                }
              }
          });

          map.addImage('taxi-icon', imgTaxi);
          map.addSource('taxi', { type: 'geojson', data: 'data/taxi.json' });
          map.addLayer({
              "id": "taxi",
              "type": "symbol",
              "source": "taxi",
              "layout": {
                  "icon-image": "taxi-icon",
                  "icon-size": 1,
                  "text-field": "{station}",
                  "text-size": 12
              }
          });

          map.addImage('bus-icon', imgBus);
          map.addSource('bus', { type: 'geojson', data: 'data/bus.json' });
          map.addLayer({
              "id": "bus",
              "type": "symbol",
              "source": "bus",
              "layout": {
                  "icon-image": "bus-icon",
                  "icon-size": 1,
                  "text-field": "{station}",
                  "text-size": 12
              }
          });

          map.addImage('underground-icon', imgUnderground);
          map.addSource('underground', { type: 'geojson', data: 'data/underground.json' });
          map.addLayer({
              "id": "underground",
              "type": "symbol",
              "source": "underground",
              "layout": {
                  "icon-image": "underground-icon",
                  "icon-size": 1,
                  "text-field": "{station}",
                  "text-size": 12
              }
          });
        });
      });
    });
  });
}());
