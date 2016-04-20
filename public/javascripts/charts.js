'use strict';
//Create an object to hold labels and ratings for the chart
var data = {
  labels: ['Metascore', 'Imdb Rating', 'Tomato Rating', 'Tomato User Rating'],
  series: []
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
    seriesBarDistance: 15,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value;
      }
    }
  }],
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 10,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];


//hold the names of the relevant movieInfo properties
var ratings = ['Metascore', 'imdbRating', 'tomatoMeter', 'tomatoUserMeter'];

movieInfo.forEach(function(movie, index){
  data.series.push({});
  data.series[index].name = movieInfo[index].Title;
  data.series[index].data = [];
  ratings.forEach(function(rating){
  //iterate through the array and push it to the chart data object
    data.series[index].data.push(parseInt(movieInfo[index][rating]));
  });
  //imdb score is /10 instead of /100. Multiply it by 10
  data.series[index].data[1] *= 10;
});//movieinfo for each

//Jquery
$(document).ready(function() {
  //create the bar graph
  new Chartist.Bar('.chart', data, options, responsiveOptions);
});

$(window).on('load',function() {
  $.each($('#movieNames').children(), function(index) {
    console.log($(this));
    console.log($('.ct-bar').eq( index * 4 ).css('stroke'));
    $(this).css('background-color', $('.ct-bar').eq( index * 4 ).css('stroke'));
  });
});


