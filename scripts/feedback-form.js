var feedbackForm;
var feedbackBody;
var feedbackName;
var feedbackEmail;

function confirmSent(submitElement,thebody) {
	console.log("Sent email");
	console.log(thebody);
	submitElement.classList.remove("feedback__submit");
	submitElement.innerHTML = "Thanks for giving your feedback!"
	submitElement.onclick = ""
	feedbackForm.reset();
}

function sendfeedbackemail(submitElement) {
	feedbackForm = document.getElementsByClassName("feedback")[0];
	feedbackBody = document.getElementsByClassName("feedback__body")[0].value;
	feedbackName = document.getElementsByClassName("feedback__name")[0].value;
	feedbackEmail = document.getElementsByClassName("feedback__email")[0].value;
	feedbackNameFutureResearch = document.getElementsByClassName("feedback__name_future_research")[0].value;
	feedbackEmailFutureResearch = document.getElementsByClassName("feedback__email_future_research")[0].value;

	if (feedbackBody || feedbackName || feedbackEmail || feedbackNameFutureResearch || feedbackEmailFutureResearc) {
		var data = {
			service_id: 'service_onrvqui',
			template_id: 'template_lasyg2a',
			user_id: 'j1GSki_AKrHZwIEmQ',
			template_params: {
				'feedbackBody': feedbackBody,
				'feedbackName': feedbackName,
				'feedbackEmail': feedbackEmail,
				'feedbackNameFutureResearch': feedbackNameFutureResearch,
				'feedbackEmailFutureResearch': feedbackEmailFutureResearch
			}
		};
		
		$.ajax('https://api.emailjs.com/api/v1.0/email/send', {
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json'
		}).done(function() {
			confirmSent(submitElement, feedbackBody)
		}).fail(function(error) {
			console.log('mailjs send error: ' + JSON.stringify(error));
		});
	}
	else {
		console.log("Feedback form fields empty. Not sending mail.");
	}
}



