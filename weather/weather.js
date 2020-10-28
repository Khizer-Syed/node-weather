const request = require('request');
var getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/a0f7fe569f4a91bef49fbc05b021e0ed/${latitude},${longitude}`,
    json: true
  },(error, response, body) => {
    if (!error && response.statusCode === 200) {
      var response = {
        temperature: body.currently.temperature,
        actualTemp: body.currently.apparentTemperature
      };
      callback(undefined, response);
    } else {
      callback(`Unable to fetch weather`);
    }
  });
};

module.exports.getWeather = getWeather;
