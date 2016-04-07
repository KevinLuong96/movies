var search = require('./search.js');


$('.search').on('keyup', function(e){
  if(e.keyCode === 13){
    var parameters = {title: $(this).val()};
    console.log(parameters);
  };
});

module.exports = search;