'use strict';
//NodeJS modules
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();
var bing = require('node-bing-api')({ accKey: 'hP4kNCbLCTBmE1FnzDozKj2m9mFgOosKUcXS6lKAznE' });
//variable declarations
var app = express();
var movie, url;
var movieInfo= {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function getMovieImage(title, callback){
  // takes the title of a movie, searches the bing api for   related image
  // and adds it to an object holding movie info
  movieInfo.Image = [];
  bing.images(title + ' movie', {
    top: 4,
    imageFilters: {
      aspect: 'wide'
    },
    face: 'other'
  }, function(err, res, body){
    if(err){ 
      throw err;
    } else{
      body.d.results.forEach(function(movie){
        movieInfo.Image.push(movie.MediaUrl);
      }); // foreach movie
      callback(movieInfo);
    } 
  }); //callback function
}

function getMovieInfo(title,callback){
  // takes the title of a movie and returns an object containing information about it
  url = 'http://www.omdbapi.com/?t=' + title + '&tomatoes=true&r=json';
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      movieInfo = JSON.parse(body);
      callback(movie);
    } else if( error ){
      throw error;
    }
  }); //movie info request
}



router.get('/:movie?', function(req, res) {
  //direct to home path or movie path, call render in movie info and text if movie
  if(req.path === '/'){
    res.render('movies-home', {movieInfo :'Homepage'});
  } else {

    movie = req.params.movie;
    getMovieInfo(movie, function(data){
      getMovieImage(data, function(info){
        res.render('movies', {movieInfo: info});
      });
    });
  }

});


router.post('/', function(req, res){
  res.redirect('/movies/' + req.body.titleName);
});


module.exports = router;