function endGame(score) {
	const endScreen = document.getElementById("endScreen");
	const buttons = document.querySelectorAll(".buttons");

	const gameOver = document.getElementById("gameOver");
	const endScore = document.getElementById("score");
	const leaderboardPage = document.getElementById("leaderboardPage");
	const form = document.getElementById("form");
	const nameInput = document.querySelector(".formInput");
	
	const backButton = document.querySelectorAll(".back");
	const playAgain = document.querySelectorAll(".playagain");
	const submitScore = document.getElementById("submitscore");
	const leaderboardButton = document.getElementById("leaderboard");
	const submitForm = document.getElementById("submitform");

	endScreen.style.display = "inline-block";
	endScore.innerHTML = `Score: ${score}`;
	playAgain[0].onclick = () => {
		endScreen.style.display = "none";
		start();
	};
	playAgain[1].onclick = () => {
		endScreen.style.height = "45%";
		graphics.changeDisplay([leaderboardPage, buttons[0], playAgain[1], endScore, endScreen], ["none", "flex", "none", "", "none"]);
		gameOver.innerHTML = "Game Over!";
		start();
	};
	backButton[0].onclick = () => {
		endScreen.style.height = "45%";
		graphics.changeDisplay([form, buttons[0], buttons[1]], ["none", "flex", "none"]);
		endGame(score);
	};
	backButton[1].onclick = () => {
		endScreen.style.height = "45%";
		graphics.changeDisplay([leaderboardPage, buttons[0], backButton[1], endScore], ["none", "flex", "none", ""]);
		gameOver.innerHTML = "Game Over!";
		endGame(score);
	};
	submitScore.onclick = () => {
		endScreen.style.height = "50%";
		graphics.changeDisplay([form, buttons[0], buttons[1]], ["flex", "none", "flex"]);
	};
	submitForm.onclick = () => {
		if (nameInput.value !== "") {
			const url = "http://localhost:3000/submit"
			const params = `name=${nameInput.value}&score=${score}`;
			fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: params
			}).then(
				endScreen.style.height = "45%",
				graphics.changeDisplay([form, buttons[0], buttons[1]], ["none", "flex", "none"]),
				endGame(score),
				leaderboard(endScreen, gameOver, buttons, playAgain, endScore)
			);
		}
	};
	leaderboardButton.onclick = () => {
		fetch("http://localhost:3000/leaderboard")
			.then((res) => res.json())
			.then((data) => {
				console.log(data),
				//TODO: pass data to leaderboard
				leaderboard(endScreen, gameOver, buttons, backButton, endScore)
			});
	};
}

function leaderboard(endScreen, gameOver, buttons, bottomButton, endScore) {
	endScreen.style.height = "62%";
	graphics.changeDisplay([leaderboardPage, buttons[0], buttons[2], bottomButton[1], endScore],
			["flex", "none", "flex", "inline-block", "none"]);
	gameOver.innerHTML = "Leaderboard";
}