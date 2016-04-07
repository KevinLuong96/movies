var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.get('/:movie?', function(req, res) {
  if(req.path === '/'){
    res.render('movies', {movie:'Homepage'});
  } else {
    var movie = req.params.movie;
    var url = 'http://www.omdbapi.com/?t=' + movie + '&r=json';

    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var movieInfo = body;
        res.render('movies', {movie:movie, movieInfo: movieInfo});
      }
    });

  }
});

router.post('/', function(req, res){
  res.redirect('/movies/' + req.body.titleName);

});




module.exports = router;