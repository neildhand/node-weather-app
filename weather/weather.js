const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/60c20756fc587f564d4c1bb0c435a559/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to find weather');
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                humidity: body.currently.humidity
            });
        }
    });
};

module.exports.getWeather = getWeather;
