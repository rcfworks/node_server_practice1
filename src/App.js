const path = require('path');
const express = require('express');
const utils = require('./utils/Utils.js');


const app = express();



/* ROUTES */
//app.com ==> root URL
//app.com/help
//app.com/about

const PORT = 3050;

//app.use APPROACH Setup static directory to serve =============================
const pathDirectory = path.join(__dirname, '../public');
app.use(express.static(pathDirectory));

//path technique
app.get('/products', (req, res)=>{
    console.log(req.query);

    //FOR CONDITIONAL ACCEPTANCE OF QUERIES
    if(typeof req.query.search === 'undefined' || !req.query.search)
    {
        res.send({
            error: "You must provide a search query"
        })
        return;
    }
    res.send({
        products: []
    });
})

app.get('/weather', (req, res)=>{
    
    if(typeof req.query.address === 'undefined' || !req.query.address)
    {
        res.send({
            error: "You must provide an address"
        })
        return;
    }

    utils.geoCode(req.query.address, (msg, data)=>{
        
        if(data === null || typeof data==='undefined')
        {
            res.send({
                error: "Something went wrong with your geocoding."
            })
            return;
        }
        //{longitude: longitude, latitude:latitude,
        //location:response.body.features[0].place_name}
        utils.forecast(data.latitude, data.longitude, (msg, result)=>{
            if(result===null)
            {
                res.send({
                    error: "Something went wrong with your forecast."
                })
                return;
            }
            res.send({
                address: req.query.address,
                longitude: data.latitude,
                latitude: data.longitude,
                location: data.location,
                summary: result.summary
            });
        });
    })
    
})

//HANDLING 404 PAGES===========================================================
//YOU ALWAYS PUT THIS ON THE LAST because express searches for a match
//so if you use the path approach, put the code at the last
app.get('*', (req, res)=>{
    //you can do something here

    //send back to the requester
    res.send('Something is wrong!  404');
})

/*//PATH APPROACH ============================
app.get('', (req, res)=>{
    //you can do something here

    //send back to the requester
    res.send('Hello express!');
})
app.get('/home', (req, res)=>{
    //you can do something here

    //send back to the requester
    res.send('Hello express!');
})
app.get('/help', (req, res)=>{
    //you can do something here

    //send back to the requester
    res.send('You should be in help!');
})
app.get('/about', (req, res)=>{
    //you can do something here

    //send back to the requester
    res.send('You should be in About!');
})
app.get('/weather', (req, res)=>{
    //you can do something here

    //send back to the requester
    res.send('You should be in Weather page!');
})
*/

app.listen(PORT, ()=>{
    console.log('Server is up on port ' + PORT);
});