const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=docZj15iw6MYvJsbyl2lTtiigj2r3X5d&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
    
        if(error) {
            callback('Unable to connect to MapQuest servers');
        // } else if(body === 'ZERO_RESULTS') {
        //     callback('Unable to find that address');
        } else {
            callback(undefined, {
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].displayLatLng.lat,
                longitude: body.results[0].locations[0].displayLatLng.lng
            }); 
        }
    });
};

//module.exports = {geocodeAddress};

module.exports.geocodeAddress = geocodeAddress;