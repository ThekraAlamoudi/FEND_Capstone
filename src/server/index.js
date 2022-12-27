//server index.js
const port = 8081
// Importing required modules
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const path = require('path');

// To remove regeneratorRuntime error while testing
require('babel-polyfill');

// Configuring environment variables
dotenv.config();

// Initializing express app
const app = express();

// Setting middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true,}));

// Home route
app.get('/', function(req, res) {
  //res.sendFile(path.resolve('dist/index.html'))
  res.sendFile(path.resolve('src/client/views/index.html'))
});

// Server test route
app.get('/test', function(req, res) {
  res.json({
    status : 200
  });
});

// Route to fetch lat and lang coordinates using geoname API
app.get('/getLatLang', (req, res) => {
  const url = `http://api.geonames.org/searchJSON?maxRows=10&operator=OR&q=${req.query.city}&name=${req.query.city}&username=${process.env.geonamesUser}`;
  axios.get(url)
    .then(resp => {
      res.end(JSON.stringify(resp.data.geonames[0]));
    })
    .catch(err => {
      res.end(JSON.stringify({err : "An error has occured!"}));
    });
});

// Route to get weather details of the place using weatherbit API
app.get('/getWeather', (req, res) => {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${req.query.lat}&lon=${req.query.long}&key=${process.env.weatherKey}`;
  axios.get(url)
    .then(resp => {
      res.end(JSON.stringify(resp.data));
    })
    .catch(err => {
      res.end(JSON.stringify({err : "An error has occured!"}));
    });
});

// Route to get images related to trip using pixabay API
app.get('/getPics', (req, res) => {
  const url = `https://pixabay.com/api/?key=${process.env.pixabayKey}&q=${req.query.q}&image_type=photo`;
  axios.get(url)
    .then(resp => {
      res.end(JSON.stringify(resp.data.hits[0]));
    })
    .catch(err => {
      res.end(JSON.stringify({err : "An error has occured!"}));
    });
});

// Setting the server up at the defined port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  });
  
module.exports = app;
