const request = require("request");

const forecast = (long, lat, cb) => {
  const url = `https://api.darksky.net/forecast/40b3e2be7070ebac7a974eaa22d42a8d/${long},${lat}?units=si`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      cb("unable to connect", undefined);
    } else if (!response.body.currently) {
      cb("unable to find location", undefined);
    } else {
      const {
        temperature,
        precipProbability: precip
      } = response.body.currently;
      const { summary } = response.body.hourly;
      const forecast = `${summary}It is ${temperature} degrees out and there is a ${precip}% chance of rain`;
      cb(undefined, {
        forecast
      });
    }
  });
};

module.exports = forecast;
