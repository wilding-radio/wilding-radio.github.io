var feedbackForm;
var feedbackBody;
var feedbackName;
var feedbackEmail;

function confirmSent(submitElement,thebody) {
	console.log("Sent email");
	console.log(thebody);
	submitElement.classList.remove("feedback__submit");
	submitElement.innerHTML = "Thanks for giving your feedback!"
	feedbackForm.reset();
}

function sendfeedbackemail(submitElement) {
	feedbackForm = document.getElementsByClassName("feedback")[0];
	feedbackBody = document.getElementsByClassName("feedback__body")[0].value;
	feedbackName = document.getElementsByClassName("feedback__name")[0].value;
	feedbackEmail = document.getElementsByClassName("feedback__email")[0].value;
	feedbackNameFutureResearch = document.getElementsByClassName("feedback__name_future_research")[0].value;
	feedbackEmailFutureResearch = document.getElementsByClassName("feedback__email_future_research")[0].value;

	var thebody = "Name and email:<br>"+ feedbackName + "<br>"+feedbackEmail+"<br><br> Name and email for future research:<br>"+feedbackNameFutureResearch + "<br>"+feedbackEmailFutureResearch+"<br><br> Body text:<br><br>"+feedbackBody.replace(/(?:\r\n|\r|\n)/g, '<br>')

	Email.send({
	    SecureToken : "c7091985-1af0-4589-a4ae-3cd5dc269f64",
	    To : 'wildingradio@gmail.com',
	    From : "wilding.radio.feedback@soundtent.org",
	    Subject : "New wilding.radio feedback",
	    Body : thebody
	}).then(
	confirmSent(submitElement, thebody)
	);
}



