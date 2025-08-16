var listenToKnepp;
var links;

$( document ).ready(function() {
    badges = document.getElementsByClassName("badge");

    for (var i=0;i<badges.length;i++) {
      links = $(badges[i]).children('span');
      links.removeClass("underline");
      links.addClass("no-underline");

      badges[i].addEventListener("mouseover",function() {
        
        if (window.innerWidth/window.innerHeight > 1.0) {
          links = $(this).children('span');
          links.addClass("underline");
          links.removeClass("no-underline");
        }
      });

      badges[i].addEventListener("mouseout",function() {
        links = $(this).children('span');
        links.removeClass("underline");
        links.addClass("no-underline");
      });
    }
});