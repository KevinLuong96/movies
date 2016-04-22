'use strict';

$(document).ready(function(){
  //initialize the sticky nav bar 
  $('.nav').sticky({zIndex: 100});
});

$(document).on('sticky-start', '.nav', function() {
  //prepend a title to the nav bar on sticky start
  $('.nav-bar').append(
    '<li class="left">Graph<span class="coloured">Cat</span></li>');
});

$(document).on('sticky-end','.nav', function(){
  //remove the added element when flex ends
  $('.nav-bar').children('.left').remove();
});