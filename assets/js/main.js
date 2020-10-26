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
			'alert("Hello World");',
			'alertBox("Hello World);',
			'window("Hello World);',
			'msgBox("Hello World);'
		],
		correctAnswer: 'alert("Hello World");'
	},
	{
		question: 'How do you call a function?',
		potentialAnswers: [
			'function:myFunction()',
			'function=myFunction()',
			'function myFunction()',
			'myFunction()'
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
var timeLeft = questions.length * 15;
var timerID;
//track added html elements with id counter
var initialsId = 0;
var btnIdEl = 0;

//variables to reference (DOM)
var titleIntro = document.querySelector('#title-intro');
var quizContent = document.querySelector('#quiz-content');
var endGame = document.querySelector('#end-game');
var hScore = document.querySelector('#highscore-display');
var startBtn = document.querySelector('#start-button');
var subBtn = document.querySelector('#submit-button');
var timeEl = document.querySelector('#time');
var qCont = document.querySelector('#questions');
var paCont = document.querySelector('#potential-answers');
var fCont = document.querySelector('#feedback-container');
var entInitials = document.querySelector('#initials');

var highScore = document.querySelector('#final-score');

//function to start the game
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
//function to take seconds off the clock
function countdown() {
	timeLeft--;
	timeEl.textContent = timeLeft;

	if (timeLeft <= 0) {
		endQuiz();
	}
}
//function to generate the questions
function genQuestion() {
	//clear the potential answer container if the end user cycles through the quiz again
	paCont.innerHTML = '';

	if (questionNumber > questions.length - 1) {
		endQuiz();
	} else {
		qCont.innerHTML = questions[questionNumber].question;
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
//function to validate the response from the end user
function validate(x) {
	var userChoice = x.target.value;
	var correctAnswer = questions[questionNumber].correctAnswer;

	setTimeout(function () {
		fCont.innerHTML = '';
	}, 1000);

	if (userChoice != correctAnswer) {
		var incorrectMsg = document.createElement('h2');
		incorrectMsg.className = 'incorrectmsg';
		incorrectMsg.textContent = 'Sorry, that is incorrect!';
		fCont.appendChild(incorrectMsg);
		questionNumber++;
		timeLeft -= 10;
		if (timeLeft < 0) {
			timeLeft = 0;
		} else {
			setTimeout(function () {
				genQuestion();
			}, 1000);
		}
	} else {
		var correctMsg = document.createElement('h2');
		correctMsg.className = 'correctmsg';
		correctMsg.textContent = 'CORRECT!';
		fCont.appendChild(correctMsg);
		questionNumber++;
		timeLeft += 5;
		setTimeout(function () {
			genQuestion();
		}, 1000);
	}
}
//function to end the quiz
function endQuiz() {
	clearInterval(timeLeft);
	clearInterval(timerID);
	timeEl.textContent = message;
	endGame.setAttribute('class', 'show');
	quizContent.setAttribute('class', 'hide');

	highScore.innerHTML = '';
	highScore.textContent = timeLeft;
	highScore = timeLeft;
}
//function to save the score
function saveScore() {
	// get value of input box
	var initials = entInitials.value.trim();
	// make sure value wasn't empty
	if (initials !== '') {
		// get saved scores from localstorage, or if not any, set to empty array
		var highscores =
			JSON.parse(window.localStorage.getItem('highscores')) || [];
		// format new score object for current user
		var newScore = {
			score: timeLeft,
			initials: initials
		};
		// save to localstorage
		highscores.push(newScore);
		window.localStorage.setItem('highscores', JSON.stringify(highscores));
		// redirect to next page
		window.location.href = 'highscore.html';
	}
}

//event listeners for the buttons (start quiz, answer selections, and submit)
startBtn.addEventListener('click', startQuiz);
paCont.addEventListener('click', validate);
subBtn.addEventListener('click', saveScore);
