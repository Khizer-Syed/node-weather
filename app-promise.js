const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
.options({
    a: {
      demand: true,
      alias: 'address',
      describe: `Address to fetch weather for`,
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAELxIiHBdrBXWYDe9GUZEvCnZ0LF-x3CE`

axios.get(geocodeURL).then((response) => {
  if (response.data.status === 'ZERO_RESULTS' || response.data.status === 'INVALID_REQUEST') {
    throw new Error('Unable to find the address');
  }
var lat = response.data.results[0].geometry.location.lat;
var lng = response.data.results[0].geometry.location.lng;
var weatherURL = `https://api.darksky.net/forecast/a0f7fe569f4a91bef49fbc05b021e0ed/${lat},${lng}`;
console.log(response.data.results[0].formatted_address);
return axios.get(weatherURL);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`The temperature now is`,temperature,`but it feels like`,apparentTemperature);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
      console.log(`Unable to connect to the API server`);
  } else {
    console.log(e.message);
  }

})
