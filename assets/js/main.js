//GLOBAL VARIABLES
const questions = [
	{
		question: 'Inside which HTML element do we put the JavaScript?',
		potentialAnswers: ['<scripting>', '<javascript>', '<js>', '<script>'],
		correctAnswer: '<script>'
	},
	{
		question: 'Where is the correct place to insert JavaScript?',
		potentialAnswers: [
			'The <head> section',
			'The <body> section',
			'The <footer> section',
			'Both 1 and 2'
		],
		correctAnswer: 'Both 1 and 2'
	},
	{
		question: 'How do you write "Hello World" in an alert box?',
		potentialAnswers: [
			'alert("Hello World);',
			'alertBox("Hello World);',
			'window("Hello World);',
			'msgBox("Hello World);'
		],
		correctAnswer: 'alert("Hello World);'
	},
	{
		question: 'How do you create a function?',
		potentialAnswers: [
			'function:myFunction()',
			'function=myFunction()',
			'function myFunction()',
			'myFunction():function'
		],
		correctAnswer: 'myFunction()'
	},
	{
		question:
			'How do you write a conditional statement for executing some statements only if "i" is NOT equal to 5?',
		potentialAnswers: ['if (i!=5)', 'if =! 5 then', 'if (i<>5)', 'if <>5'],
		correctAnswer: 'if (i!=5)'
	}
];
var message = "Time's up!";
//this is used to set the question index to pull the first question from the questions array
var questionNumber = 0;
//keep track of the time
/* var timeLeft = questions.length * 15; */
var timeLeft = 5;
var timerID;
var btnIdEl = 0;

//variables to reference (DOM)
var startBtn = document.querySelector('#start-button');
var timeEl = document.querySelector('#time');
var titleIntro = document.querySelector('#title-intro');
var quizContent = document.querySelector('#quiz-content');
var finalScore = document.querySelector('#final-score');
var qCont = document.querySelector('#questions');
var paCont = document.querySelector('#potential-answers');
var fCont = document.querySelector('#feedback-container');

//my questions for the quiz as an object

//create a function to start the game
function startQuiz() {
	//hide the intro
	titleIntro.setAttribute('class', 'hide');

	//display the questions
	quizContent.setAttribute('class', 'show');

	//use setInterval to indicate the length of time between each execution of a fuction
	timerID = setInterval(countdown, 1000);

	//set the time element to display the text that is timeLeft
	timeEl.textContent = timeLeft;
	genQuestion();
}

//create a function to take seconds off the clock
function countdown() {
	timeLeft--;
	timeEl.textContent = timeLeft;

	if (timeLeft <= 0) {
		endQuiz();
	}
}

//create a function ot generate the questions
function genQuestion() {
	//create a function to check the answer
	//deduct seconds if wrong answer
	//move to new question if the answer is correct
	
	//clear the conent if the end user cycles through the quiz again
	paCont.innerHTML = "";

	if (questionNumber > questions.length) {
		endQuiz();
	} else {
		qCont.innerHTML = questions[questionNumber].question;

		//set this to an empty string so it clears when the genQuestion function runs from the start
		paCont.innerHTML = '';
		for (
			var i = 0;
			i < questions[questionNumber].potentialAnswers.length;
			++i
		) {
			var button = document.createElement('button');
			button.className = 'button pabutton';
			button.setAttribute('id', 'button-' + btnIdEl);
			button.setAttribute(
				'value',
				questions[questionNumber].potentialAnswers[i]
			);
			button.textContent = questions[questionNumber].potentialAnswers[i];
			paCont.appendChild(button);
			btnIdEl++;
		}
	}
}

function validate() {
//create a function to end the quiz

fCont.innerHTML = ""



}

function endQuiz() {
	//what should happen when the quiz ends?

	//stop the time
	clearInterval(timeLeft);
	timeEl.textContent = message;
	finalScore.setAttribute('class', 'show');

	//display final score screen
}
//create a function to save the high scores

//what are the button clicks doing?
startBtn.addEventListener('click', startQuiz);
