const graphics = require('./graphics.js')

module.exports = function leaderboard(data, endScreen, gameOver, buttons, bottomButton, endScore) {
	endScreen.style.height = "62%";
	graphics.changeDisplay([leaderboardPage, buttons[0], buttons[2], bottomButton[1], endScore],
			["flex", "none", "flex", "inline-block", "none"]);
	graphics.displayTable(data);
	gameOver.innerHTML = "Leaderboard";
}