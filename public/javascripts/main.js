'use strict';

function resizeContainer(){
  //adjusts the width of the movie container to fit side by side given enough space
  var numBoxes = Math.floor(window.innerWidth / 500);
  //create a variable to hold the max number of boxes that will fit
  //at the current width
  if(numBoxes >= 1 && $('.movie-container').length >= numBoxes){
    //if the amount of movies to fit is greater or equal to the max number of boxes
    // that will fit, readjust the size of the container to fit
    $('.movie-container').css('width', 100 / numBoxes + '%');
  }
}

$('.tomatoes').click(function() {
  // display legend and colour graph appropriately
  $('#rotten-tomatoes').slideToggle();
  $('html, body').animate({
    //scroll to bottom of element when displayed
    scrollTop: $('#rotten-tomatoes').offset().top
  }, 2000);
  $.each($('.ct-series'), function() {
    if(!$(this).children().eq(2).hasClass('coloured')){
      //change colour of graph bars
      $(this).children().eq(2).css('stroke', '#00C957').addClass('coloured');
      $(this).children().eq(3).css('stroke', 'blue').addClass('coloured');
    } else {
      $(this).children().removeClass('coloured').removeAttr('style');
  }
  });
});


$(window).on('load', function(){
  //after background images load, check their natural width property to ensure
  //no errors (403) have occured and remove if width is 0
  $('.carousel-item img').each(function(){
    if(!$(this).parent().hasClass('slick-cloned') && $(this).context.naturalWidth === 0){
      $('.carousel').slick('slickRemove', $(this).parent().attr('data-slick-index'));
    }
  });
  //adjust size of movie containers when window is finished loading
  resizeContainer();
});

$(document).ready(function() {
  $('#rotten-tomatoes').hide();
  //initialize carousel 
  $('.carousel').slick({
  autoplay: true,
  autoplaySpeed: 6000,
  arrows: false,
  dots: true,
  });
});

//resize window on when window width is changed
$(window).resize(resizeContainer);

