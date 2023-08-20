function loadRandomFooter(elem){
	elem.onload = null;

	var rand = Math.floor(Math.random()*4)+1;

	elem.src = "file:///home/max/Type/work/wilding_dot_radio/v2_june_2023/site2/assets/img/footer/footer_"+rand+".jpg";
	console.log("Loaded random footer "+rand);
}