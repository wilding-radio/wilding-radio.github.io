var anchorPositions = [];
var anchors = [];
var lastPosition = 0;

$( document ).ready(function() {
    $('.anchor-section').each(function() {
        anchorPositions.push( $(this).offset().top );
    });
    anchors = document.getElementsByClassName("anchorbar__anchor");
});

$(window).scroll(function () { //on scroll event on window
    var position = $(this).scrollTop(); //position scrolled sofar
    var height = window.innerHeight;
    position += (height/2);

    var anchorFadePoint = height*1.5;

    if (lastPosition != -1) {
        if (lastPosition < anchorFadePoint && position >= anchorFadePoint ) {
            $('.anchorbar').css("opacity",1);
        }
        else if (lastPosition >= anchorFadePoint && position < anchorFadePoint ) {
            $('.anchorbar').css("opacity",0);
        }
    }

    for (var i=0;i<anchorPositions.length-1;i++) {
        if (position >= anchorPositions[i] && position <= anchorPositions[i+1] ) {
            anchors[i].classList.remove("no-underline");
        }
        else {
            anchors[i].classList.add("no-underline");
        }
    }
    lastPosition = position;
});