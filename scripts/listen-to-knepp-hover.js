var listenToKnepp;
var links;

$( document ).ready(function() {
    listenToKnepp = document.getElementById("listen-to-knepp");
    links = $(listenToKnepp).children('span');
    links.removeClass("underline");
    links.addClass("no-underline");

    listenToKnepp.addEventListener("mouseover",function() {
      
      if (window.innerWidth/window.innerHeight > 1.0) {
        links.addClass("underline");
        links.removeClass("no-underline");
      }
    });

    listenToKnepp.addEventListener("mouseout",function() {
      links.removeClass("underline");
      links.addClass("no-underline");
    });
});