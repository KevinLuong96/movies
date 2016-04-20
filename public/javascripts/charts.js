'use strict';
//hold the bar graph colours to be used for this page
var colours= [];

function genColour(){
  //generates a random light color (rgb values 128-256) and returns a string
  //in 'rgb(###,###,###) form'
  var colours = ['red','blue','green'];
  var colorString = 'rgb(';
  colours.forEach(function(val, index) {
    colorString += (Math.floor(Math.random() * 128) + 128);
    if(index !== colours.length - 1){
      colorString += ',';
    }
  });
  colorString += ')';
  return colorString;
}

function reColour(colours){
  // for each colour generated, set the bars and background text to that colour
  colours.forEach(function(val, index){
    for(var i = index * 4; i < index * 4 + 4; i ++){
      $('.ct-bar').eq(i).css('stroke', colours[index]);
    }
    $('#movieNames').children().eq(index).css('background-color', colours[index]);
  });
}

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
  //reset the colours array
  colours = [];
  //for each movie, create a colour and push it to the colour array used
  //to recolour the bars for that movie
  $('.movie-container').each(function() {
    colours.push(genColour());
  });
}); 


$('.chart').bind('DOMNodeInserted', function() {
  //when the chart is drawn or redrawn, recolour it to the new colours
  if($('.ct-bar').eq(movieInfo.length * 4 - 1).length === 1){
    //when the last bar is added to the graph, recolour all of the lines
    reColour(colours);
  }
});



