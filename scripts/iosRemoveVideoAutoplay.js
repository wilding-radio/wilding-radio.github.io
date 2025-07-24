// Removes the play button from videos on ios (by removing the autoplay attribute)


function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}


$(document).ready(function() {
  videos = document.getElementsByTagName("video");
  isIOS = iOS(); 
  if (isIOS) {
    for (var i=0;i<videos.length;i++) {
      videos[i].style.display = "none";
    }
  }

});
