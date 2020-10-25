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
/* var timeLeft = 5; */
var timerID;
var initialsId = 0;
var btnIdEl = 0;

//variables to reference (DOM)
var startBtn = document.querySelector('#start-button');
var subBtn = document.querySelector('#submit-button');
var timeEl = document.querySelector('#time');
var titleIntro = document.querySelector('#title-intro');
var quizContent = document.querySelector('#quiz-content');
var endGame = document.querySelector('#end-game');
var qCont = document.querySelector('#questions');
var paCont = document.querySelector('#potential-answers');
var fCont = document.querySelector('#feedback-container');
var entInitials = document.querySelector('#initials');
var sList = document.querySelector('#score-list');
var hScore = document.querySelector('#highscore-display');
var highScore = document.querySelector('#final-score');

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
		setTimeout(function () {
			genQuestion();
		}, 1000);
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

function endQuiz() {
	clearInterval(timeLeft);
	clearInterval(timerID);
	timeEl.textContent = message;
	endGame.setAttribute('class', 'show');
	quizContent.setAttribute('class', 'hide');

	highScore.innerHTML = '';
	highScore.textContent = timeLeft;
	highScore = timeLeft;

	function saveScore() {
		var entInitials = document.getElementById('initials').value;
		localStorage.setItem('initials', JSON.stringify(entInitials));
		localStorage.setItem('highscore', JSON.stringify(highScore));

		endGame.setAttribute('class', 'hide');
		hScore.setAttribute('class', 'show');

		var highScores = JSON.parse(localStorage.getItem('highscore')) || [];
		var initials = JSON.parse(localStorage.getItem('initials')) || [];

		console.log(initials);
		console.log(highScores);

		var scoreList = document.createElement('li');
		scoreList.className = 'userinitials';
		scoreList.setAttribute('id', 'user-initials-' + initialsId);
		scoreList.setAttribute('value', initials);
		scoreList.textContent = initials + ' ' + highScores;
		sList.appendChild(scoreList);
		initialsId++;
	}
	subBtn.addEventListener('click', saveScore);
}

//what are the button clicks doing?
startBtn.addEventListener('click', startQuiz);
paCont.addEventListener('click', validate);
