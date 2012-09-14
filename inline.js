(function ($) { 
  $(document).ready(function(){
    setTimeout(
      function(){
        var width = $('#applifier_bar').width(),
            height = $('#applifier_bar').height();
        if(width == 120)
          width = 160;
        $('#applifier_bar').html(
          "<iframe src='http://raldenhoven.nl/songpop/iframe.html' frameBorder='0' width='"+width+"px' height='"+height+"px'></iframe>"  
        );
      }
    ,10000)
  });
})(jQuery)
