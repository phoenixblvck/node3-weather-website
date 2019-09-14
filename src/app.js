const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
console.log(partialsPath);
//Setup handlerbars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Andries'
    });
});

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Andries'
    })
});

app.get('/help', (req,res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Andries',
        helpText: 'this is a test messaage'
    });
});
app.get('/weather', (req,res) =>{
    let address = req.query.address;
    if(!address){
        return res.send({
            error: 'Please provide an address'
        });
    } else{
        geoCode(address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({
                    error
                });
            }
            forecast(latitude, longitude, (error, forecastData = {}) => {
                if(error){
                    return res.send({
                        error
                    });
                }
                return res.send({
                    forecast: forecastData,
                    location,
                    address
                });
              });
        });
    }
});

app.get('/help/*', (req,res) =>{
    res.render('404',
    {
        title: '404',
        errorMessage: 'Help page not found',
        name: 'Andries'
    });
});

app.get('/products',(req, res) =>{
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        });
    } else {
        res.send({
            products:[]
        });
    }
    
});

app.get('*', (req, res) =>{
    res.render('404',
    {
        title: '404',
        errorMessage: 'This page not found',
        name: 'Andries'
    });
});
app.listen(3000, () =>{
    console.log('Server is running on port 3000');
});