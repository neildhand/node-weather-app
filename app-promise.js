const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv; 

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=docZj15iw6MYvJsbyl2lTtiigj2r3X5d&location=${encodedAddress}`;

axios.get(geocodeUrl).then( (response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }

    var latitude = response.data.results[0].locations[0].latLng.lat;
    var longitude = response.data.results[0].locations[0].latLng.lng;

    var weatherUrl = `https://api.darksky.net/forecast/60c20756fc587f564d4c1bb0c435a559/${latitude},${longitude}`;


    console.log(response.data.results[0].locations[0]);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`Its currently ${temperature} degrees. It feels like ${apparentTemperature} degrees`);
}).catch( (e) => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});
