const request = require('request');

const forecast = (lat, long, callback) =>{
    const url = 'https://api.darksky.net/forecast/381c65b7bf6592de0a6d4fc5101bac5f/'+lat+','+long+'?units=si';
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Could not connect to the forecast services');
        } else if(body.error){
            callback(body.error);
        }else{
            callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature+" degree out. There is a "+ body.currently.precipProbability+"% chance of rain. The maximum temperature for the day is "+body.daily.data[0].temperatureMax+" degrees and the minimum temperature for the day is "+body.daily.data[0].temperatureMin+" degrees.");
        }
    });
}

module.exports = forecast;