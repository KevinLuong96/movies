$('.carousel').slick({
  autoplay: true,
  autoplaySpeed: 6000,
  arrows: false,
  dots: true
});

$('.tomatoes').click(function() {
  $('#rotten-tomatoes').slideToggle();
  $('html, body').animate({
    scrollTop: $('#rotten-tomatoes').offset().top
  }, 2000);
  if(!$('.ct-series').children().eq(2).hasClass('coloured')){
    $('.ct-series').children().eq(2).css('stroke', '#00C957').addClass('coloured');
    $('.ct-series').children().eq(3).css('stroke', 'crimson').addClass('coloured');
  } else {
    $('.ct-series').children().removeClass('coloured').removeAttr('style');
  }

});

$('.carousel-item img').each(function(){
  if($(this)[0].naturalWidth === 0){
    $('.carousel').slick('slickRemove', $(this).parent().attr('data-slick-index'));
  }
});

$(document).ready(function() {
  $('#rotten-tomatoes').hide();
});

