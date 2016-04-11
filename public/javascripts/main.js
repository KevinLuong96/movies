var slickSettings = {
  autoplay: true,
  autoplaySpeed: 6000,
  arrows: false,
  dots: true
}

$('#search').on('keyup', function(e){
  if(e.keyCode === 13){
    var parameters = {search: $(this).val()};
    console.log(parameters);
  };
});

$('.carousel-item img').on('error',function(){
  console.log($(this).parent().attr('data-slick-index'));
  $('.carousel').slick('slickRemove', $(this).parent().attr('data-slick-index'));



});

$('.carousel').slick(slickSettings);