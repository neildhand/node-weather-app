const request = require('request');

var geocodeAddress = (address) => {
    return new Promise( (resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=docZj15iw6MYvJsbyl2lTtiigj2r3X5d&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
    
        if(error) {
            reject('Unable to connect to MapQuest servers');
        // } else if(body === 'ZERO_RESULTS') {
        //     callback('Unable to find that address');
        } else {
            resolve({
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].displayLatLng.lat,
                longitude: body.results[0].locations[0].displayLatLng.lng
            }); 
        }
    });

    });
};

geocodeAddress('19146').then( (location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});