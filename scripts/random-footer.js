function loadRandomFooter(elem){
	elem.onload = null;

	var rand = Math.floor(Math.random()*4)+1;

	elem.src = "https://wilding.radio/assets/img/footer/footer_"+rand+".jpg";
	console.log("Loaded random footer "+rand);
}