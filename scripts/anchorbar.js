var anchorPositions = [];
var anchors = [];
var lastPosition = 0;
var anchorFadePointHeightMultiplier = 1.5;

function setAnchorPositions() {
    anchorPositions = [];
    $('.anchor-section').each(function() {
        anchorPositions.push( $(this).offset().top );
    });
}

$( document ).ready(function() {
    setAnchorPositions();
    anchors = document.getElementsByClassName("anchorbar__anchor");
});

$(window).resize(function() {
    setAnchorPositions();
})

$(window).scroll(function () { //on scroll event on window
    var position = $(this).scrollTop(); //position scrolled sofar
    var height = window.innerHeight;
    position += (height/2);

    var anchorFadePoint = height*anchorFadePointHeightMultiplier;

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