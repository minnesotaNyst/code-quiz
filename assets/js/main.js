//variables to reference (DOM)
var startBtn = document.querySelector('#start-button');
var titleIntro = document.querySelector('#title-intro');
var quizContent = document.querySelector('#quiz-content');

//global variables

//this is used to set the question index to pull the first question from myQuestions
var questionNumber = 0

//my questions for the quiz as an object
var myQuestions = [
	{
		question: 'Inside which HTML element do we put the JavaScript',
		potentialAnswers: ['<scripting>', '<javascript>', '<js>', '<script>'],
		correctAnswer: '<script>'
	},
	{
		question: 'Where is the correct place to insert JavaScript',
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

//create a function to start the game
function startQuiz() {
	//hide the intro
	titleIntro.setAttribute('class', 'hide');

	//display the questions
	quizContent.setAttribute('class', 'show');
}

//create a function to take seconds off the clock

//create a function ot generate the questions
function genQuestion () {

	

}


//create a function to check the answer
//deduct seconds if wrong answer
//move to new question if the answer is correct

//create a function to end the quiz

//create a function to save the high scores

//what are the button clicks doing?
startBtn.addEventListener('click', startQuiz);
