//NodeJS modules
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();
var bing = require('node-bing-api')({ accKey: 'hP4kNCbLCTBmE1FnzDozKj2m9mFgOosKUcXS6lKAznE' });

//variable declarations
var app = express();
// var Future = Sync.Future();
var movie, url;
var movieInfo= {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function getMovieImage(title, callback){
  // takes the title of a movie, searches the bing api for   related image
  // and adds it to an object holding movie info
  bing.images(title + 'movie', {
    top: 2,
    imageFilters: {
      aspect: 'wide'
    },
    face: 'other'
  }, function(error, res, body){
    movieInfo.Image = body.d.results[0].MediaUrl;
    callback(movieInfo);
  }); //bing image search
}

function getMovieInfo(title,callback){
  // takes the title of a movie and returns an object containing information about it
  url = 'http://www.omdbapi.com/?t=' + title + '&r=json';
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      movieInfo = JSON.parse(body);
      callback(movie);
    }
  }); //movie info request
};

router.get('/:movie?', function(req, res) {

  if(req.path === '/'){
    res.render('movies', {movieInfo :'Homepage'});
  } else {

    movie = req.params.movie;

    // getMovieInfo(movie, function(data){
    //   console.log(data);
    // });

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