'use strict';
//Create an object to hold labels and ratings for the chart
var data = {
  labels: ['Metascore', 'Imdb Rating', 'Tomato Rating', 'Tomato User Rating'],
  series: [[]]
};

//Chartist variables
var options = {
  high: 100,
  seriesBarDistance: 15,
  height: window.innerHeight * 0.6
};
var responsiveOptions = [
  //use media queries to update the chart responsively
  ['screen and (min-width: 641px) and (max-width: 1024px)', {
    seriesBarDistance: 10,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value;
      }
    }
  }],
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];


//hold the names of the relevant movieInfo properties
var ratings = ['Metascore', 'imdbRating', 'tomatoMeter', 'tomatoUserMeter'];
if(!movieInfo.Error){
  // if movie is found in the database
  ratings.forEach(function(rating){
  //iterate through the array and push it to the chart data object
    data.series[0].push(movieInfo[rating]);
  });
  //imdb score is /10 instead of /100. Multiply it by 10
  data.series[0][1] *= 10;
}

//Jquery
$(document).ready(function() {
  //create the bar graph
  new Chartist.Bar('.chart', data, options, responsiveOptions);
});




