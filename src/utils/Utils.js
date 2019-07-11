const request = require('request');

const geoCode=(address, callback)=>
{
    const url2="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYm9icmNmd29ya3MiLCJhIjoiY2p4cjdkd2lrMDV3cDNsdDVoc2dsaTdrYiJ9.TJQriJTWc2r7Y5M4xwLKKQ";
    
    console.log(url2);
    
    request({url:url2, json: true}, (error, response)=>{

        if(error)
        {
            callback('Unable to connect location to services.', null);
        }
        else if(response.body.features.length<=0)
        {
            callback('Unable to find location, try another search.', null);
        }
        else
        {
            var coords = response.body.features[0].center;
            var longitude = coords[0];
            var latitude = coords[1];
        
            console.log("longitude ["+longitude+"] latitude ["+latitude+"] ")

            callback("", {longitude: longitude, latitude:latitude,
            location:response.body.features[0].place_name});
        }
        
    
    });
}

const forecast=(latitude, longitude, callback)=>
{
    var str = 'https://api.darksky.net/forecast/76ac786e16cf0fd9524b7a3da1cff726/' + latitude+','+longitude;
    console.log("str: " + str);
    
    request({ url:str, json: true}, (error, response)=>{

        if(error)
        {
            callback('Unable to connect forecast services.', null);
        }
        else
        {
            if(typeof response === 'undefined' || response===null)
            {
                callback('Incorrect params.', null);
                return;
            }
            callback('Success! ', {summary:response.body.daily.data[0].summary, time:response.body.currently.time});
        }
        // console.log(response.body.latitude);
        // console.log(response.body.longitude);
        // console.log(response.body.currently.time);
        // console.log(response.body.daily.data[0].summary);
    })

}
module.exports = {
    geoCode: geoCode,
    forecast: forecast
}