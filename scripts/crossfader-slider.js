var isPlaying,slider1,slider2,slider3,airPercents,waterPercents,airAudio,waterAudio,uparrow1,downarrow1,uparrow2,downarrow2,isIOS;
var initialized = false;
var lastGainSet = 0;
var iosGainOnTouchStart;
var lastWaterTime = -1;
var lastAirTime = -1;
var isDisabled = true;
var airVolMultiplier = 0.7 

// var targetWaterVol = 0;
// var targetAirVol = 0;
// var fadeStartTime = -1;
// var fadeInterval;


function cs_play() {
  if (isDisabled) {
    waterAudioFallback.play();
    airAudioFallback.play();
  }
  else {
    airAudio.play();
    waterAudio.play();
  }
  airTimeUpdate();
  waterTimeUpdate();
  playPause.textContent = 'Pause';
  document.getElementsByClassName("crossfader-slider__playpause")[0].src="assets/img/pause.svg";
  document.getElementsByClassName("crossfader-slider__playpause")[1].src="assets/img/pause_white.svg";
  isPlaying = true;
}

function cs_pause() {
  waterAudioFallback.pause();
  airAudioFallback.pause();
  airAudio.pause();
  waterAudio.pause();
  document.getElementsByClassName("crossfader-slider__playpause")[0].src="assets/img/play.svg";
  document.getElementsByClassName("crossfader-slider__playpause")[1].src="assets/img/play_white.svg";
  isPlaying = false;
}

function playPause() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    cs_play();
  } else {
    cs_pause();
  }
}

$( document ).ready(function() {
    crossfaderInit();
});

function crossfaderInit() {
  slider1 = document.getElementsByClassName("crossfader-slider__input")[0];
  slider2 = document.getElementsByClassName("crossfader-slider__input")[1];
  slider3 = document.getElementsByClassName("crossfader-slider__input")[2];
  uparrow1 = document.getElementsByClassName("crossfader-slider__uparrow")[0];
  uparrow2 = document.getElementsByClassName("crossfader-slider__uparrow")[1];
  downarrow1 = document.getElementsByClassName("crossfader-slider__downarrow")[0];
  downarrow2 = document.getElementsByClassName("crossfader-slider__downarrow")[1];
  airAudio = document.getElementsByClassName("air-audio")[0];
  waterAudio = document.getElementsByClassName("water-audio")[0];
  airAudioFallback = document.getElementsByClassName("air-audio-fallback")[0];
  waterAudioFallback = document.getElementsByClassName("water-audio-fallback")[0];
  airPercents = document.getElementsByClassName("air");
  waterPercents = document.getElementsByClassName("water");

  slider3.addEventListener('input', setGain );
  document.addEventListener('touchstart', onInputTouchStart );
  document.addEventListener('touchend', onInputTouchEnd );

  airAudio.volume = 1-airVolMultiplier;
  airAudioFallback.volume = 1-airVolMultiplier;
  waterAudio.volume = 0.5;
  waterAudioFallback.volume = 0.5;

  isIOS = iOS(); 
  if (isIOS) {
    console.log("iOS detected");
    var instructionText = $(".crossfader-slider__long-instructions").first().html().replace("fade","switch");
    $(".crossfader-slider__long-instructions").first().html(instructionText);
  }

  airAudio.addEventListener("timeupdate", function(e) {if (isPlaying) {airTimeUpdate();} }, false);
  waterAudio.addEventListener("timeupdate", function(e) {if (isPlaying) {waterTimeUpdate();} }, false);


  $(".air-audio").bind("error", function (e) { airError();});
  $(".air-audio").bind("progress", function (e) {airTimeUpdate(); enablePlayer(); });
  $(".water-audio").bind("error", function (e) { waterError(); });
  $(".air-audio").bind("progress", function (e) {waterTimeUpdate(); enablePlayer(); });

  setInterval(function() {
    restartStreamIfOffline();
  }, 1000);

  loadAir();
  loadWater();

  initialized = true;
}

function airError() {
  lastAirTime = -1;
  disablePlayer();

  // start load/error loop to check if stream has returned
  // setTimeout( function() { airAudio.load(); }, 2000);
}
function waterError() {
  lastWaterTime = -1;
  disablePlayer();
  
  // start load/error loop to check if stream has returned
  // setTimeout( function() { waterAudio.load(); }, 2000);
}
function waterTimeUpdate() {
  lastWaterTime = Date.now();
}
function airTimeUpdate() {
  lastAirTime = Date.now();
}

function restartStreamIfOffline() {
  if (isPlaying && !isDisabled) {
    var timenow = Date.now();
    if (timenow - lastAirTime > 2000) {
      loadAir();
      airAudio.play();
    }
    if (timenow - lastWaterTime > 2000) {
      loadWater();
      waterAudio.play();
    }
  }
}

function enablePlayer() {
  if (!isPlaying && lastAirTime != -1 && lastWaterTime != -1 && isDisabled) {
    $(".crossfader-slider__playpause").css("opacity","1");
    $(".crossfader-slider__player").css("pointer-events","all");
    $(".crossfader-slider__error-text").css("visibility","hidden");
    $(".crossfader-slider__instructions").css("visibility","visible");
    $(".crossfader-slider__error-instructions").css("visibility","hidden");
    isDisabled = false;
  }
}

function disablePlayer() {
  $(".crossfader-slider__playpause").css("opacity","1"); //0.7
  $(".crossfader-slider__player").css("pointer-events","all"); //none
  $(".crossfader-slider__error-text").css("visibility","visible");
  $(".crossfader-slider__instructions").css("visibility","hidden");
  $(".crossfader-slider__error-instructions").css("visibility","visible");
  isDisabled = true;
  isPlaying = true;
  playPause();
}

function loadAir() {
  console.log("Loaded air");
  airAudio.src = airAudio.src.split("?")[0] + "?timestamp=" + Date.now();
  airAudio.load();
}


function loadWater() {
  console.log("Loaded water");
  waterAudio.src = waterAudio.src.split("?")[0] + "?timestamp=" + Date.now();
  waterAudio.load();
}

function onInputTouchStart() {
  iosGainOnTouchStart = slider3.value;
}
function onInputTouchEnd() {
  setTimeout(function() {slider3.value = slider1.value; }, 100); // cannot set value directly after mouseup
}



// function fadeStep() {
//   var currentWaterVol = waterAudio.volume;
//   var step = 0.0001;

//   if (targetWaterVol>currentWaterVol+step && currentWaterVol+step < 1) {
//     waterAudio.volume = currentWaterVol+step;
//   }
//   else if (targetWaterVol<currentWaterVol-step && currentWaterVol-step > 0) {
//     waterAudio.volume = currentWaterVol-step;
//   }

//   // console.log(currentWaterVol);

//   airAudio.volume = 0;

//   if (Date.now() - fadeStartTime > 500) {
//     fadeStartTime = -1;
//     console.log("Stopped Fading At: "+currentWaterVol);
//     clearInterval(fadeInterval);
//   }
// }
// function startFading() {
//   if (fadeStartTime == -1) {
//     console.log("Started Fading");
//     fadeInterval = setInterval(function() {
//       fadeStep();
//     }, 10);
//   }
//   fadeStartTime = Date.now();
// }

function setGain() {
  // startFading(); // start the fader if not already started

  if (isIOS) {
    var dif = iosGainOnTouchStart-Number(slider3.value);

    if (Math.abs(dif) > 15) {
      if (Math.abs(dif) > 30) {
        dif = (dif/Math.abs(dif) ) * slider3.max;
      }
      else {
        dif = (dif/Math.abs(dif) ) * slider3.max/2;
      }

      gainSet = iosGainOnTouchStart - dif;
      if (gainSet < slider3.min) {gainSet = slider3.min;}
      if (gainSet > slider3.max) {gainSet = slider3.max;}
    }
    else {
      gainSet = iosGainOnTouchStart
    }
    slider1.value = gainSet;
    slider2.value = gainSet;
  }

  else {
    uparrow1.style.display = "none";
    downarrow1.style.display = "none";
    uparrow2.style.display = "none";
    downarrow2.style.display = "none";

    gainSet = slider3.value;
  }
  slider1.value = gainSet;
  slider2.value = gainSet;

  var waterVol = gainSet/slider3.max;
  var airVol = airVolMultiplier * (slider3.max - gainSet)/slider3.max;
  
  if (!isFinite(waterVol) ) {waterVol = 0;}
  if (!isFinite(airVol) ) {airVol = 0;}

  if (waterVol == 0) {
    waterAudio.muted = true;
    waterAudioFallback.muted = true;
  }
  else {
    waterAudio.volume = waterVol;
    waterAudioFallback.volume = waterVol;
    waterAudio.muted = false;
    waterAudioFallback.muted = false;
  }

  if (airVol == 0) {
    airAudio.muted = true;
    airAudioFallback.muted = true;
  }
  else {
    airAudio.volume = airVol;
    airAudioFallback.volume = airVol;
    airAudio.muted = false;
    airAudioFallback.muted = false;
  }

  waterPercents[0].innerHTML = Math.round(100*gainSet/slider1.max)+"%";
  waterPercents[1].innerHTML = Math.round(100*gainSet/slider1.max)+"%";
  airPercents[0].innerHTML = (100-Math.round(100*gainSet/slider1.max))+"%";
  airPercents[1].innerHTML = (100-Math.round(100*gainSet/slider1.max))+"%";

  // waterPercents[0].innerHTML = Math.round( (gainSet/50.0)/0.02)+"%";
  // waterPercents[1].innerHTML = Math.round( (gainSet/50.0)/0.02)+"%";
  // airPercents[0].innerHTML = Math.round( ( (slider1.max-gainSet)/50.0)/0.02)+"%";
  // airPercents[1].innerHTML = Math.round(  ( (slider1.max-gainSet)/50.0)/0.02)+"%";

  lastGainSet = gainSet;
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