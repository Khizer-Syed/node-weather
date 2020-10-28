const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const yargs = require('yargs');
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
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
if(errorMessage) {
  console.log(errorMessage);
} else {
  console.log(results.address);
  weather.getWeather(results.latitude, results.longitude, (errorMessage, response) => {
    if(errorMessage) {
      console.log(errorMessage);
    } else {
      console.log(`The temperature now is`,response.temperature,`but it feels like`,response.actualTemp);
    }
  });
}
});
