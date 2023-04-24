var anchorPositions = [];
var anchors = [];

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


    for (var i=0;i<anchorPositions.length-1;i++) {
        if (position >= anchorPositions[i] && position <= anchorPositions[i+1] ) {
            anchors[i].classList.add("bold");
        }
        else {
            anchors[i].classList.remove("bold");   
        }
    }
});