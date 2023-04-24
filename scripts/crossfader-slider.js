var isPlaying,slider1,playOrPause,slider2,slider3,airPercents,waterPercents,airAudio,waterAudio,uparrow1,downarrow1,uparrow2,downarrow2,isIOS;
var initialized = false;

function playPause() {
  // if (!initialized) {init();}

  isPlaying = !isPlaying;
  if (isPlaying) {
    airAudio.play();
    waterAudio.play();
    playPause.textContent = 'Pause';
    document.getElementsByClassName("crossfader-slider__playpause")[0].src="assets/img/pause.svg";
    document.getElementsByClassName("crossfader-slider__playpause")[1].src="assets/img/pause_white.svg";
  } else {
    airAudio.pause();
    waterAudio.pause();
    document.getElementsByClassName("crossfader-slider__playpause")[0].src="assets/img/play.svg";
    document.getElementsByClassName("crossfader-slider__playpause")[1].src="assets/img/play_white.svg";
  }
}

function init() {
  slider1 = document.getElementsByClassName("crossfader-slider__input")[0];
  slider2 = document.getElementsByClassName("crossfader-slider__input")[1];
  slider3 = document.getElementsByClassName("crossfader-slider__input")[2];
  uparrow1 = document.getElementsByClassName("crossfader-slider__uparrow")[0];
  uparrow2 = document.getElementsByClassName("crossfader-slider__uparrow")[1];
  downarrow1 = document.getElementsByClassName("crossfader-slider__downarrow")[0];
  downarrow2 = document.getElementsByClassName("crossfader-slider__downarrow")[1];
  airAudio = document.getElementsByClassName("air-audio")[0];
  waterAudio = document.getElementsByClassName("water-audio")[0];
  airPercents = document.getElementsByClassName("air");
  waterPercents = document.getElementsByClassName("water");
  playOrPause = document.querySelector('playPause');

  // slider1.addEventListener('input', setGain1 );
  // slider2.addEventListener('input', setGain2 );
  slider3.addEventListener('input', setGain );
  

  airAudio.volume = 0.3;
  waterAudio.volume = 0.5;

  isIOS = iOS(); 
  if (isIOS) {
    console.log("iOS detected");
    slider1.max = 2; slider1.value = 1;
    slider2.max = 2; slider2.value = 1;
    slider3.max = 2; slider3.value = 1;
  }

  initialized = true;
}

// function setGain1() {setGain(slider1);}
// function setGain2() {setGain(slider2);}

function setGain() {
  if (!isIOS) {
    uparrow1.style.display = "none";
    downarrow1.style.display = "none";
    uparrow2.style.display = "none";
    downarrow2.style.display = "none";
  }
  
  const gainSet = Number(slider3.value);
  var waterVol = gainSet/slider1.max;
  var airVol = 0.7 * (slider1.max - gainSet)/slider1.max;
  
  if (waterVol == 0) {
    waterAudio.muted = true;
  }
  else {
    waterAudio.volume = waterVol;
    waterAudio.muted = false;
  }

  if (airVol == 0) {
    airAudio.muted = true;
  }
  else {
    airAudio.volume = airVol;
    airAudio.muted = false;
  }

  slider1.value = slider3.value;
  slider2.value = slider3.value;
  waterPercents[0].innerHTML = Math.round(100*gainSet/slider1.max)+"%";
  waterPercents[1].innerHTML = Math.round(100*gainSet/slider1.max)+"%";
  airPercents[0].innerHTML = (100-Math.round(100*gainSet/slider1.max))+"%";
  airPercents[1].innerHTML = (100-Math.round(100*gainSet/slider1.max))+"%";

  // waterPercents[0].innerHTML = Math.round( (gainSet/50.0)/0.02)+"%";
  // waterPercents[1].innerHTML = Math.round( (gainSet/50.0)/0.02)+"%";
  // airPercents[0].innerHTML = Math.round( ( (slider1.max-gainSet)/50.0)/0.02)+"%";
  // airPercents[1].innerHTML = Math.round(  ( (slider1.max-gainSet)/50.0)/0.02)+"%";
}

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