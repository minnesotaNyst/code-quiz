/* var sList = document.querySelector('#score-list');
var initials = document.getElementById('initials').value;

function postScore(){
	const maxScores = 5;
	localStorage.setItem('finalScore', JSON.stringify(scoreObj));

	finalScore.push(scoreObj);
	finalScore.sort((a, b) => b.score - a.score);
	finalScore.splice(maxScores);

	localStorage.setItem('initials', JSON.stringify(initials));
	localStorage.setItem('highscore', JSON.stringify(finalScore));

	var scoreList = document.createElement('li');
	scoreList.className = 'userinitials';
	scoreList.setAttribute('id', 'user-initials-' + initialsId);
	scoreList.setAttribute('value', initials);
	scoreList.textContent = initials + ' ' + highScores;
	sList.appendChild(scoreList);
	initialsId++;
}

postScore(); */
