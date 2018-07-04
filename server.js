const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('index')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.set('view engine', 'ejs')


/*let apiKey ="YQAdXzFZcPoqXEPxLThsQjGDfSdlhmgC";
let city = 'Chicago';
let url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/locations/{city}`*/

/*var opt={
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/locations/Chicago',
    method: 'GET',
    headers: {
        'token' : 'YQAdXzFZcPoqXEPxLThsQjGDfSdlhmgC'
    }
};*/

let apiKey = '16206fb67123f151384b18e356959938';
let weatherText = '';

/*var opt={
    url: 'http://api.openweathermap.org/data/2.5/weather?zip=60004&APPID=16206fb67123f151384b18e356959938',
    method: 'GET'
};*/

//request(opt, function(res, body) {
//    console.log(body);
//  });

app.post('/', function(req, res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${city}&units=imperial&APPID=${apiKey}`
    request(url, function(res, body) {
        let weather = JSON.parse(body.body);
        weatherText = `In ${weather.name}, it's ${weather.weather['0'].main} and ${weather.main.temp} degrees.`;
        console.log(weatherText);
        //weather.render('index', weatherText);
});
//res.render('index', weatherText);

})
