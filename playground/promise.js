const request = require('request');

var geocodeAddress = (address) => {
  var encodedAddress = encodeURIComponent(address);
  return new Promise((resolve, reject) => {
  request({
    url : `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAELxIiHBdrBXWYDe9GUZEvCnZ0LF-x3CE`,
    json : true
  }, (error, response, body) => {
    if (error) {
      reject(`Unable to connect to Google servers`);
    } else if (body.status === 'ZERO_RESULTS' || body.status === 'INVALID_REQUEST') {
      reject('Unable to locate the address');
    } else if (body.status === 'OK') {
      resolve({
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
  });
};

geocodeAddress(`####`).then((location) => {
  console.log(JSON.stringify(location));
}).catch((errorMessage) => {
  console.log(errorMessage);
})
