const fs = require('fs');

const routeData = require('../routes.json');
const taxiData = require('../../public/data/taxi.json');
const busData = require('../../public/data/bus.json');
const undergroundData = require('../../public/data/underground.json');

// Construct map of stations by station number
stations = {};
taxiData.features.forEach(f => {
  stations[f.properties.station] = f.geometry.coordinates;
});
busData.features.forEach(f => {
  stations[f.properties.station] = f.geometry.coordinates;
});
undergroundData.features.forEach(f => {
  stations[f.properties.station] = f.geometry.coordinates;
});

function getRouteColor(routeType) {
  let color = '#888';
  if (routeType === 'taxi') {
    color = 'yellow';
  } else if (routeType === 'bus') {
    color = 'green';
  } else if (routeType === 'underground') {
    color = 'red';
  }
  return color;
}

function buildRouteGeoJson(routeType, coords) {
  return {
    "type": "Feature",
    "properties": {
      "type": routeType,
      "color": getRouteColor(routeType)
    },
    "geometry": {
      "type": "LineString",
      "coordinates": coords
    }
  }
}

routeGeoJson = {
  "type": "FeatureCollection",
  "features": []
}
routeData.forEach(r => {
  if (r.type === 'taxi')
  {
  let waypoints = []
  let start = stations[r.stations[0]];
  waypoints.push(start);
  if (r.via) {
    r.via.forEach(v => {
      waypoints.push(stations[v]);
    });
  }
  let stop = stations[r.stations[1]];
  waypoints.push(stop)
  let newRoute = buildRouteGeoJson(r.type, waypoints);
  routeGeoJson.features.push(newRoute);
}
});

fs.writeFile("../../public/data/routes.geo.json", JSON.stringify(routeGeoJson), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Route GeoJSON created and saved successfully.");
});
