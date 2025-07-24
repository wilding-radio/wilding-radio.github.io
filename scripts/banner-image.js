// sunrises_knepp_2023 = ["08:04","07:38","06:46","05:38","04:35","03:52","03:51","04:26","05:14","06:01","06:52","07:41"];
// sunsets_knepp_2023 = ["16:05","16:52","17:41","18:33","19:22","20:06","20:19","19:47","18:47","17:40","16:36","15:58"];


// [hours,mins] at utc+0
var sunrises_knepp_2023 = [[8,4],[7,38],[6,46],[5,38],[4,35],[3,52],[3,51],[4,26],[5,14],[6,1],[6,52],[7,41]];
var sunsets_knepp_2023 = [ [16,5], [16,52],[17,41],[18,33],[19,22],[20,6],[20,19],[19,47],[18,47],[17,40],[16,36],[15,58] ];
var loadedBanner = false;


window.addEventListener("DOMContentLoaded", (event) => {
	var theBanner = document.getElementsByClassName("fullscreen-banner__image")[0];
	if (!loadedBanner && theBanner != null) {
		console.log("Loading banner from DOMContentLoaded event");
		loadBanner(theBanner);
	}
});

function shiftUTC(dateObject, offset) {
    var utc = dateObject.getTime();
    var newDateObject = new Date(utc + (3600000*offset));
    return newDateObject;
}

function loadBanner(elem){
	loadedBanner = true;
	elem.onload = null;

	var date = new Date();
	var utcOffset =  date.getTimezoneOffset()/60.0;
	var shifted = shiftUTC(date,utcOffset);


	var hoursAtUTC0 = shifted.getHours() + (shifted.getMinutes()/60.0);
	
	var month = shifted.getMonth();

	var sunriseAtUTC0 = sunrises_knepp_2023[month][0] + (sunrises_knepp_2023[month][1]/60.0);
	var sunsetAtUTC0 = sunsets_knepp_2023[month][0] + (sunsets_knepp_2023[month][1]/60.0);
	
	var imageUrl = "";

	if (hoursAtUTC0 >= sunsetAtUTC0+2 || hoursAtUTC0 < sunriseAtUTC0+2) {
		imageUrl = "night.jpg";
	}

	else if (hoursAtUTC0 < sunriseAtUTC0+2) {
		imageUrl = "dawn.jpg";
	}

	else if (hoursAtUTC0 < sunsetAtUTC0-2) {
		imageUrl = "day.jpg";
	}

	else if (hoursAtUTC0 < sunsetAtUTC0+2) {
		imageUrl = "dusk.jpg";
	}

	// elem.src = "https://wilding.radio/assets/img/knepp/"+imageUrl;
	elem.src = "./assets/img/knepp/"+imageUrl;
	console.log("Loaded background image: "+imageUrl);
}