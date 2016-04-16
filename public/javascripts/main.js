'use strict';
$('.tomatoes').click(function() {
  // display legend and colour graph appropriately
  $('#rotten-tomatoes').slideToggle();
  $('html, body').animate({
    //scroll to bottom of element when displayed
    scrollTop: $('#rotten-tomatoes').offset().top
  }, 2000);
  if(!$('.ct-series').children().eq(2).hasClass('coloured')){
    //change colour of graph bars
    $('.ct-series').children().eq(2).css('stroke', '#00C957').addClass('coloured');
    $('.ct-series').children().eq(3).css('stroke', 'crimson').addClass('coloured');
  } else {
    $('.ct-series').children().removeClass('coloured').removeAttr('style');
  }

});

$(window).on('load', function(){
  //after background images load, check their natural width property to ensure
  //no errors (403) have occured and remove if width is 0
  $('.carousel-item img').each(function(){
    if(!$(this).parent().hasClass('slick-cloned') && $(this).context.naturalWidth === 0){
      $('.carousel').slick('slickRemove', $(this).parent().attr('data-slick-index'));
    }
  });
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

