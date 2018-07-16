const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('pages/index',{
        weather: null
    })
})

const apiKey = require('./node_modules/secrets.json').apiKey;
let weatherText = '';

app.post('/', function(req, res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${city}&units=imperial&APPID=${apiKey}`

    request(url, function(response, body) {
        weather = JSON.parse(body.body);
        weatherText = `In ${weather.name}, it's ${weather.weather['0'].main} and ${weather.main.temp} degrees.`;
        console.log(weatherText);

        res.render('pages/index', { 
            weather: weatherText 
        });
    
});
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))