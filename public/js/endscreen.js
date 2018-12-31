const buttonActions = require('./buttons.js');

module.exports = function endGame(score) {
	const endScreen = document.getElementById("endScreen");
	const endScore = document.getElementById("score");
	// buttons[0] = main end screen buttons
	// buttons[1] = buttons after clicking submit score
	// buttons[2] = buttons ater clicking leaderboard
	const buttons = document.querySelectorAll(".buttons");

	const gameOver = document.getElementById("gameOver");
	const leaderboardPage = document.getElementById("leaderboardPage");
	const form = document.getElementById("form");

	const backButton = document.querySelectorAll(".back");
	const playAgain = document.querySelectorAll(".playagain");
	const submitScore = document.getElementById("submitscore");
	const leaderboardButton = document.getElementById("leaderboard");
	const submitForm = document.getElementById("submitform");

	endScreen.style.display = "inline-block";
	endScore.innerHTML = `Score: ${score}`;
	
	playAgain[0].onclick = () => { 
		buttonActions.playAgain(endScreen) 
	};
	playAgain[1].onclick = () => { 
		buttonActions.playAfterSubmit(leaderboardPage, buttons[0], playAgain[1], endScore, endScreen) 
	};
	submitScore.onclick = () => { 
		buttonActions.submitScore(form, buttons[0], buttons[1]) 
	};	
	submitForm.onclick = () => { 
		buttonActions.submitForm(endScreen, gameOver, buttons, playAgain, endScore, score) 
	};	
	leaderboardButton.onclick = () => { 
		buttonActions.leaderboard(endScreen, gameOver, buttons, backButton, endScore) 
	};
	// back button on main end screen
	backButton[0].onclick = () => {
		buttonActions.mainBack(form, buttons[0], buttons[1]);
		endGame(score);
	};
	// back button after clicking leaderboard
	backButton[1].onclick = () => {
		buttonActions.leaderboardBack(leaderboardPage, buttons[0], backButton[1], endScore);
		endGame(score);
	};
}