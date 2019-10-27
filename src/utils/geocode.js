const request = require("request");

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmFkeiIsImEiOiJjazI3bDhodGYxcnA3M2xtendlanc4bHd3In0.B6Ae9XjzePX6d3zyW2aWog
 `;

  request({ url, json: true }, (error, response) => {
    if (error) {
      cb("Unable to connect", undefined);
    } else if (response.body.features.length === 0) {
      cb("unable to find location", undefined);
    } else {
      cb(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
