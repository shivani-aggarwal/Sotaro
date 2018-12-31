const graphics = require('./graphics.js');
const leaderboard = require('./leaderboard.js');

module.exports = {
	playAgain: (endScreen) => {
		endScreen.style.display = "none";
		const start = require('./start.js');
		start();
	},
	playAfterSubmit: (leaderboardPage, button, playAgainButton, endScore, endScreen) => {
		endScreen.style.height = "45%";
		graphics.changeDisplay([leaderboardPage, button, playAgainButton, endScore, endScreen], ["none", "flex", "none", "", "none"]);
		gameOver.innerHTML = "Game Over!";
		const start = require('./start.js');
		start();
	},
	mainBack: (form, firstButton, secondButton) => {
		endScreen.style.height = "45%";
		graphics.changeDisplay([form, firstButton, secondButton], ["none", "flex", "none"]);
	},
	leaderboardBack: (leaderboardPage, button, backButton, endScore) => {
		endScreen.style.height = "45%";
		graphics.changeDisplay([leaderboardPage, button, backButton, endScore], ["none", "flex", "none", ""]);
		gameOver.innerHTML = "Game Over!";
	},
	submitScore: (form, firstButton, secondButton) => {
		endScreen.style.height = "50%";
		graphics.changeDisplay([form, firstButton, secondButton], ["flex", "none", "flex"]);
	},
	submitForm: (endScreen, gameOver, buttons, playAgain, endScore, score) => {
		const nameInput = document.querySelector(".formInput");

		if (nameInput.value !== "") {
			const url = "http://localhost:3000/submit"
			const params = `name=${nameInput.value}&score=${score}`;
			fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: params
			})
			.then(res => res.json())
			.then(data => {
				endScreen.style.height = "45%",
				graphics.changeDisplay([form, buttons[0], buttons[1]], ["none", "flex", "none"]),
				leaderboard(data, endScreen, gameOver, buttons, playAgain, endScore)
			});
		}
	},
	leaderboard: (endScreen, gameOver, buttons, backButton, endScore) => {
		fetch("http://localhost:3000/leaderboard")
			.then(res => res.json())
			.then(data => {
				leaderboard(data, endScreen, gameOver, buttons, backButton, endScore)
			});
	},
}