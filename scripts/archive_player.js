var ap_players;
var ap_volumeSliders;
var ap_volumePercents;
var ap_volumeMutes;
var ap_audios;
var ap_durations;
var ap_progresstimes;
var ap_playButtons;

var ap_savedVolumes;
var ap_muted;
var ap_playing;
var ap_dragging;


$( document ).ready(function() {
    ap_players = document.getElementsByClassName("archive-player");
    ap_progresses = document.getElementsByClassName("archive-player__progress");
    ap_volumeSliders = document.getElementsByClassName("archive-player__volume-slider");
    ap_volumePercents = document.getElementsByClassName("archive-player__volume-percent");
    ap_volumeMutes = document.getElementsByClassName("archive-player__volume-mute");
    ap_audios = document.getElementsByClassName("archive-player__audio");
    ap_durations = document.getElementsByClassName("archive-player__duration");
    ap_progresstimes = document.getElementsByClassName("archive-player__time");
    ap_playButtons = document.getElementsByClassName("archive-player__play");
    ap_savedVolumes = new Array(ap_players.length).fill(0);
    ap_muted = new Array(ap_players.length).fill(false);
    ap_playing = new Array(ap_players.length).fill(false);
    ap_dragging = new Array(ap_players.length).fill(false);

    for (var i=0;i<ap_players.length;i++) {
      ap_players[i].index = ap_progresses[i].index = ap_volumeSliders[i].index = ap_volumePercents[i].index = ap_volumeMutes[i].index = ap_audios[i].index = ap_durations[i].index = ap_progresstimes[i].index = ap_playButtons[i].index = i;

       ap_progresses[i].addEventListener("input", onProgressInput);
       ap_progresses[i].addEventListener("mouseup", onProgressMouseUp);
       ap_progresses[i].addEventListener("touchstart", onProgressMouseUp);
       ap_progresses[i].addEventListener("mousedown", onProgressMouseDown);
       ap_progresses[i].addEventListener("touchend", onProgressMouseDown);
       ap_volumeSliders[i].addEventListener("input", ap_VolumeInput);
       ap_audios[i].addEventListener("timeupdate", ap_progressUpdate);
       ap_audios[i].addEventListener("ended", ap_togglePlay);
       ap_audios[i].addEventListener("ended", ap_playNext);
       ap_volumeMutes[i].addEventListener("click", ap_toggleMute );
       ap_playButtons[i].addEventListener("click", ap_togglePlay );
       ap_updateDuration(i);
       ap_progresses[i].value = 0;
       ap_volumeSliders[i].value = 50;
       ap_volumePercents[i].innerHTML = "50%";
       ap_audios[i].volume = 0.5;
    }
});

function ap_secsToMMSS(secs) {
  var date = new Date(null);
  date.setSeconds(secs);
  return date.toISOString().slice(14, 19);
}

function ap_secsToHHMMSS(secs) {
  var date = new Date(null);
  date.setSeconds(secs);
  return date.toISOString().slice(11, 19);
}

function ap_setVolume(val,index) {
  ap_volumeSliders[index].value = Math.round(val*100);

  var percent = Math.round(val*100)+"%";
  // if (percent.length == 2) {percent = "0"+percent; }

  ap_volumePercents[index].innerHTML = percent;
  ap_audios[index].volume = val;
}

function ap_togglePlay() {
  var index = this.index;

  if (!ap_playing[index]) {
    ap_play(index);
  }
  else {
    ap_pause(index);
  }
}

function ap_play(index) {
  ap_audios[index].play();
  ap_playButtons[index].src = "assets/img/pause_filled.svg";

  for (var i=0;i<ap_players.length;i++) {
    if (i != index && ap_playing[i]) {
      ap_pause(i);
    }
  }
  ap_playing[index] = true;
}

function ap_playNext() {
  var index = this.index;
  
  if (index+1 < ap_players.length) {
    ap_play(index+1);
  }
}

function ap_pause(index) {
  ap_audios[index].pause(); 
  ap_playButtons[index].src = "assets/img/play_filled.svg";
  ap_playing[index] = false;
}


function ap_progressUpdate(index) {
  //If called from an event listener, index will not be a number
  if ( isNaN(index) ) { index = this.index; }


  if (ap_audios[index].duration != 0  && !ap_dragging[index]) {
    ap_progresses[index].value = ap_audios[index].currentTime * 100.0 / ap_audios[index].duration; 
  }

  if (ap_audios[index].duration / (60*60 ) < 1) { // if under an hour
    ap_progresstimes[index].innerHTML = ap_secsToMMSS(ap_audios[index].currentTime);
  }
  else { // else over an hour
   ap_progresstimes[index].innerHTML = ap_secsToHHMMSS(ap_audios[index].currentTime); 
  }
}

function ap_updateDuration(index) {
  //If called from an event listener, index will not be a number
  if ( isNaN(index) ) { index = this.index; } 

  if (ap_audios[index].duration) {
    if (ap_audios[index].duration / (60*60 ) < 1) { // if under an hour
      ap_durations[index].innerHTML = "/"+ap_secsToMMSS(ap_audios[index].duration);
    }
    else { // else over an hour
      ap_durations[index].innerHTML = "/"+ap_secsToHHMMSS(ap_audios[index].duration);
      ap_progressUpdate(index);
    }
  }
  else {
    ap_audios[index].addEventListener("loadedmetadata", ap_updateDuration );
  }
}



function onProgressMouseUp() {
  var index = this.index;

  if (ap_audios[index].duration) { 
    var calculatedTime = ap_audios[index].duration*(ap_progresses[index].value/ap_progresses[index].max);
    ap_audios[index].currentTime = calculatedTime;
    ap_dragging[index] = false;
  }
  ap_play(index);
}

function onProgressMouseDown() {
  var index = this.index;
  ap_pause(index);
  ap_dragging[index] = true;
}

function onProgressInput() {
  var index = this.index;

  if (ap_audios[index].duration) { 
    var calculatedTime = ap_audios[index].duration*(ap_progresses[index].value/ap_progresses[index].max);

    if (ap_audios[index].duration / (60*60 ) < 1) { // if under an hour
      ap_progresstimes[index].innerHTML = ap_secsToMMSS(calculatedTime);
    }
    else { // else over an hour
       ap_progresstimes[index].innerHTML = ap_secsToHHMMSS(calculatedTime);
    }    
  }
}

function ap_VolumeInput() {
  var index = this.index;

  ap_setVolume(this.value/100.0, index);
  ap_savedVolumes[index] = this.value/100.0;

  if (this.value == 0 && !ap_muted[index]) {ap_mute(index);}
  if (this.value != 0 && ap_muted[index]) {ap_unmute(index);}
}

function ap_toggleMute() {
  var index = this.index;
  if (ap_muted[index]) {ap_unmute(index); }
  else {ap_mute(index); }
}

function ap_mute(index) {
  ap_volumeMutes[index].src = "assets/img/vol_muted.svg";
  ap_setVolume(0,index);
  ap_muted[index] = true;
}

function ap_unmute(index) {
  ap_volumeMutes[index].src = "assets/img/vol.svg";
  if (ap_savedVolumes[index] == 0) {
    ap_savedVolumes[index] = 0.5;
  }
  ap_setVolume(ap_savedVolumes[index],index);
  ap_muted[index] = false;
} 
