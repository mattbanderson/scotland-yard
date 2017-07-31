const fs = require('fs');

const routeData = require('../routes.json');
const syData = require('../../public/data/sy.json');

// Construct map of stations by station number
stations = {};
syData.features.forEach(f => {
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
  let start = stations[r.stations[0]];
  let stop = stations[r.stations[1]];
  let newRoute = buildRouteGeoJson(r.type, [start, stop]);
  console.log(newRoute, start, stop);
  routeGeoJson.features.push(newRoute);
});

fs.writeFile("../../public/data/routes.geo.json", JSON.stringify(routeGeoJson), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Route GeoJSON created and saved successfully.");
});
