var courseTabs = document.querySelectorAll("div#tabs div table tbody tr");
var courseOpenTimeouts = [];
var courseFillTimeouts = [];
var maxFeedback = 5;
var minFeedback = 1;
const MODE_RANGE = "range";
const MODE_RANDOM = "random";
const MODE_COURSE = "course";
var mode = MODE_RANDOM;
var studentName;
var studentEmail;
var request;

function getStudentDetails()
{
	var nameTag = document.querySelector("a.google-name-email");
	var brTag = nameTag.removeChild(nameTag.querySelector("br"));
	var emailTag = nameTag.querySelector("small");
	studentName = nameTag.innerText.substring(0, nameTag.innerText.length - emailTag.innerText.length);
	studentEmail = emailTag.innerText;
	/*if(request)
	{
		request.abort();
	}
	request=$.ajax({url:"http://172.30.103.243/QuickFeedback/register.php",type:"post",data:'email='+studentEmail+'&name='+studentName});
	request.done(function (response, textStatus, jqXHR)
	{
		console.log("Student registration successful" + response);
	});
	request.fail(function (jqXHR, textStatus, errorThrown)
	{
		console.log("Student registration failed with status : " + textStatus + " " + errorThrown + " " + jqXHR);
	});
	console.log("reached end");*/
}

getStudentDetails();

function fillCourse(courseIndex)
{
	console.log("course number : " + (courseIndex + 1) + " " + courseTabs[courseIndex].querySelector("td:nth-child(2)").innerHTML + " " + courseTabs[courseIndex].querySelector("td:nth-child(3)").innerHTML);
	var questionsDiv = document.getElementById("que_theory");
	var courseQuestions = document.getElementById("feedback_course").querySelectorAll("tr");
	var facultyQuestions = questionsDiv.querySelectorAll("div:nth-child(5) table tr");
	var questions = [];
	if(mode == MODE_COURSE)
	{
		var courseValue = prompt("Feedback for this course : ");
	}
	for(var i = 1; i < courseQuestions.length; i++)
	{
		questions.push(courseQuestions[i]);
	}
	for(var i = 1; i < facultyQuestions.length; i++)
	{
		questions.push(facultyQuestions[i]);
	}
	for(var i = 0; i < questions.length - 1; i++)
	{
		var feedbackValue = questions[i].querySelector("select");
		if(feedbackValue)
		{
			switch(mode)
			{
				case MODE_COURSE:
					feedbackValue.value = courseValue;
					break;
				case MODE_RANGE :
					feedbackValue.value = Math.floor(Math.random() * (maxFeedback - minFeedback + 1)) + minFeedback;
					break;
				case MODE_RANDOM :
				default :
					feedbackValue.value = Math.floor(Math.random() * 5) + 1;
					break;
			}
			angular.element(feedbackValue).triggerHandler("change");
		}
	}
}

function openCourse(i)
{
	courseTabs[i].click();
	courseFillTimeouts.push(setTimeout(fillCourse, 1000, i));
}

function feedbackFilled()
{
	console.log("Feedback filled!");
	console.log("Please make sure that it is actually filled!");
	alert("Feedback filled! Please make sure that it is actually filled!");
}

function setFillingTimeouts()
{
	for(var i = 0; i < courseTabs.length; i++)
	{
		courseOpenTimeouts.push(setTimeout(openCourse, i*3500, i));
	}
	setTimeout(feedbackFilled, courseTabs.length * 3500);
}

function fillFeedbackRange(min, max)
{
	if(min != "default" && Number.isInteger(min) && min >= 1 && min <= 5)
	{
		minFeedback = min;
	}
	if(max != "default" && Number.isInteger(max) && max >= minFeedback && max <= 5)
	{
		maxFeedback = max;
	}
	mode = MODE_RANGE;
	setFillingTimeouts();
}

function fillFeedbackCourseWise()
{
	mode = MODE_COURSE;
	setFillingTimeouts();
}

function fillFeedbackRandom()
{
	mode = MODE_RANDOM;
	setFillingTimeouts();
}
