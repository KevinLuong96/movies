'use strict';
//NodeJS modules
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();
var bing = require('node-bing-api')({ accKey: 'hP4kNCbLCTBmE1FnzDozKj2m9mFgOosKUcXS6lKAznE' });
//variable declarations
var app = express();
var url, title;
var movies = [];
var movieImages = [];
var movieInfo = [];
var counter = 0;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function getMovieImage(titles, index, callback){
  // takes the title of a movie, searches the bing api for related image
  // and adds it to an object holding movie info
  bing.images(titles[index] + ' movie', {
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
          movieImages[index].push(movie.MediaUrl);
        }); // foreach movie
        callback();
      } 
  }); //callback function
}

function getMovieInfo(titles, index, callback){
  // takes the title of a movie and the index of it in the array
  // adds an object containing movie data to the movieinfo array
  url = 'http://www.omdbapi.com/?t=' + titles[index] + '&tomatoes=true&r=json';
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      try{
        movieInfo[index] = JSON.parse(body);
      } catch(e){
        return console.error(e);
      }
      callback();
    } else if( error ){
      throw error;
    }
  }); //movie info request
}



router.get('/:movie?', function(req, res) {
  //direct to home path or movie path, call render in movie info and text if movie
  if(req.path === '/'){
    res.render('movies-home');
  } else {

    title = req.params.movie;
    movies = title.split('+');

    movies.forEach(function(movie, index){
      //remove leading spaces in search queries 
      if( movie[0] === ' ' ){
        movies[index] = movie.slice(1);
      }
    });

    //reset values to zero
    counter = 0;
    movieInfo = [];
    movieImages = [];

    movies.forEach(function(movie, index){
      movieInfo.push({});
      movieImages.push([]);
      getMovieInfo(movies, index, function(){
        if(movieInfo[index].Response === 'False'){
          res.render('movies-home', {title : movie, movieInfo: movieInfo});
        } else{
            counter++;
            if(counter === ( movies.length * 2 )){
              res.render('movies', {movieInfo : movieInfo, images: movieImages});
            }
        }
      }); // get movie info
      getMovieImage(movies, index, function(){
        counter++;
        if(counter === ( movies.length * 2 )){
          res.render('movies', {movieInfo : movieInfo, images: movieImages});
        }
      });
    });
  }
}); //router function;


router.post('/', function(req, res){
  res.redirect('/movies/' + req.body.titleName);
});


module.exports = router;