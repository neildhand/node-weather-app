const request = require('request');
const yargs = require('yargs');

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

    console.log(argv);

    var encodedAddress = encodeURIComponent(argv.address);

request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=docZj15iw6MYvJsbyl2lTtiigj2r3X5d&location=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].providedLocation.location}`);

    console.log(`Latitude: ${body.results[0].locations[0].displayLatLng.lat}`);

    console.log(`Longitude: ${body.results[0].locations[0].displayLatLng.lng}`);

});



// -----

// Using the MapQuest Geocoding API

// 1. Visit: https://developer.mapquest.com

// 2. Sign up for an account.

// 3. Once you're signed up, visit your profile page here: https://developer.mapquest.com/user/me/profile

// 4. Scroll down to "My Keys" and copy the long randomly generated key (screenshot).

// 5. Update the URL in your code to the following: http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=1301%20lombard%20street%20philadelphia. Make sure to replace "KEY" with the key you copied in step 4.

// The response body is slightly different between the Google and MapQuestion APIs.

// The latitude is stored on the response body here: body.results[0].locations[0].latLng.lat

// The longitude is stored on the response body here: body.results[0].locations[0].latLng.lng

// That will give you all the data needed to interact with the weather API. I plan on incorporating this into the course for future versions, but I'd like to have students test this approach out first.