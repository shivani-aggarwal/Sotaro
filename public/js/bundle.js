(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./graphics.js":5,"./leaderboard.js":7,"./start.js":8}],2:[function(require,module,exports){
module.exports = class Sprite {
	constructor(img="",speed=0, x=0, y=0, height=650, width=650, 
				xSpriteCoord=0, ySpriteCoord=0, scaledHeight=0, scaledWidth=0,
				yVelocity=0) {
		
		this.img = this.create(img, height, width);
		this.speed = speed;
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;

		this.xSpriteCoord = xSpriteCoord;
		this.ySpriteCoord = ySpriteCoord;
		this.scaledHeight = scaledHeight;
		this.scaledWidth = scaledWidth;
		this.yVelocity = yVelocity;
	}

	create(src, height, width) {
		let image = new Image();
		image.src = src;
		image.height = height;
		image.width = width;

		return image;
	}

	updateScaledValues(scale=1.74) {
		this.scaledWidth = this.width*scale;
		this.scaledHeight = this.height*scale;
	}

	drawFrame() {
		context.drawImage(
			this.img, 
			this.xSpriteCoord, 
			this.ySpriteCoord, 
			this.width, 
			this.height, 
			this.x, 
			this.y,
			this.scaledWidth,
			this.scaledHeight
		);
	}
}
},{}],3:[function(require,module,exports){
const Sprite = require('./Sprite.js');

module.exports = class Wizard extends Sprite {
	constructor(img,speed=0, x=30, y=230, height=69, width=46, 
				xSpriteCoord=70, ySpriteCoord=17, scaledHeight=120, scaledWidth=80,
				yVelocity=0, maxHeight=100, minHeight=230,
				walkIndex=0, jumpIndex=0, attackIndex=0, deadIndex=0, hurt=false) {

		super(img, speed, x, y, height, width, 
			  xSpriteCoord, ySpriteCoord, scaledHeight, scaledWidth, yVelocity);
		this.maxHeight = maxHeight;
		this.minHeight = minHeight;
		this.walkIndex = walkIndex;
		this.jumpIndex = jumpIndex;
		this.attackIndex = attackIndex;
		this.deadIndex = deadIndex;
		this.hurt = false;
	}

	walk() {
		const walkingSprite = [
			{
				xSpriteCoord: 47,
				ySpriteCoord: 109,
				width: 39,
				height: 68
			},
			{
				xSpriteCoord: 127,
				ySpriteCoord: 106,
				width: 43,
				height: 69
			},
			{
				xSpriteCoord: 208,
				ySpriteCoord: 107,
				width: 45,
				height: 68
			},
			{
				xSpriteCoord: 287,
				ySpriteCoord: 105,
				width: 43,
				height: 69
			}
		];

		this.xSpriteCoord = walkingSprite[this.walkIndex].xSpriteCoord;
		this.ySpriteCoord = walkingSprite[this.walkIndex].ySpriteCoord;
		this.width = walkingSprite[this.walkIndex].width;
		this.height = walkingSprite[this.walkIndex].height;
		this.checkIfHurt();
		this.updateScaledValues();

		this.drawFrame();

		this.walkIndex++;
		if (this.walkIndex >= walkingSprite.length) {
			this.walkIndex = 0;
		}
	}

	jump() {

		let initalVelocity = -10;
		if (this.yVelocity !== 0) {
			initalVelocity = this.yVelocity;
		}

		const jumpingSprite = [
			{
				xSpriteCoord: 106,
				ySpriteCoord: 187,
				width: 44,
				height: 78,
				yVelocity: initalVelocity
			},
			{
				xSpriteCoord: 171,
				ySpriteCoord: 189,
				width: 43,
				height: 78,
				yVelocity: 10
			},
			{
				xSpriteCoord: 70,
				ySpriteCoord: 17,
				width: 46,
				height: 69,
				yVelocity: 0
			}
		]; 

		let doneJumping = false; 
	 
		if ( (this.y === this.maxHeight && this.yVelocity === -10) ) {
			this.jumpIndex = 1;
		}
		else if ( (this.y === this.minHeight && this.yVelocity === 10) || 
			      (this.y === this.minHeight && this.jumpIndex === 1) ) {
			this.jumpIndex = 2; 
		}

		this.xSpriteCoord = jumpingSprite[this.jumpIndex].xSpriteCoord;
		this.ySpriteCoord = jumpingSprite[this.jumpIndex].ySpriteCoord;
		this.width = jumpingSprite[this.jumpIndex].width;
		this.height = jumpingSprite[this.jumpIndex].height;
		this.checkIfHurt();
		this.updateScaledValues();

		this.yVelocity = jumpingSprite[this.jumpIndex].yVelocity;
		this.y += this.yVelocity;

		this.drawFrame();

		if (this.jumpIndex >= 2) {
			this.jumpIndex = 0;
			doneJumping = true;
			return doneJumping;
		}
	}

	attack() {

		const attackingSprite = [
			{
				xSpriteCoord: 83,
				ySpriteCoord: 551,
				width: 49,
				height: 70
			},
			{
				xSpriteCoord: 152,
				ySpriteCoord: 553,
				width: 59,
				height: 71
			},
			{
				xSpriteCoord: 232,
				ySpriteCoord: 554,
				width: 56,
				height: 70
			},
			{
				xSpriteCoord: 315,
				ySpriteCoord: 555,
				width: 49,
				height: 68
			},
			{
				xSpriteCoord: 385,
				ySpriteCoord: 556,
				width: 46,
				height: 69
			}
		];

		let startFireball = false;

		this.xSpriteCoord = attackingSprite[this.attackIndex].xSpriteCoord;
		this.ySpriteCoord = attackingSprite[this.attackIndex].ySpriteCoord;
		this.width = attackingSprite[this.attackIndex].width;
		this.height = attackingSprite[this.attackIndex].height;
 		if (this.y <= this.maxHeight || this.y >= this.minHeight) {
			this.yVelocity *= -1;
		}
		if (this.y === this.minHeight) {
			this.yVelocity = 0;
		}
		this.y += this.yVelocity;

		this.checkIfHurt();
		this.updateScaledValues();
		this.drawFrame();

		if (this.attackIndex === 1) {
			startFireball = true;
		}

		this.attackIndex++;
		if (this.attackIndex >= attackingSprite.length) {
			this.attackIndex = 0;
		}

		return startFireball;
	}

	checkIfHurt() {
		if (this.hurt) {
			this.xSpriteCoord = 42;
			this.ySpriteCoord = 201;
			this.width = 46;
			this.height = 63;
		}
	}

	dead() {
		let complete = false;
		const deadSprite = [
			{
				xSpriteCoord: 93,
				ySpriteCoord: 289,
				width: 45,
				height: 62
			},
			{
				xSpriteCoord: 147,
				ySpriteCoord: 315,
				width: 76,
				height: 34
			},
			{
				xSpriteCoord: 230,
				ySpriteCoord: 320,
				width: 75,
				height: 28
			}
		];

		if (this.deadIndex > 0) {
			this.y = 300;
		}

		this.xSpriteCoord = deadSprite[this.deadIndex].xSpriteCoord;
		this.ySpriteCoord = deadSprite[this.deadIndex].ySpriteCoord;
		this.width = deadSprite[this.deadIndex].width;
		this.height = deadSprite[this.deadIndex].height;
		this.updateScaledValues();

		this.drawFrame();

		this.deadIndex++;
		if (this.deadIndex >= deadSprite.length) {
			this.deadIndex = 0;
			complete = true;
		}

		return complete;
	}

}
},{"./Sprite.js":2}],4:[function(require,module,exports){
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
},{"./buttons.js":1}],5:[function(require,module,exports){
const graphics = {
	drawStartScreen: (wizard, images, heart) => {
		images.forEach((layer, index) => {
			context.drawImage(layer.img, 0, 0);
		});

		wizard.drawFrame();
		graphics.addStartText();
		graphics.drawInGameInfo(0,3,heart);
	},

	drawBackground: (images) => { 
		images.forEach((layer,index) => {
			if (layer.x < -650) {
				layer.x = 0;
			}
			for (var i = 0; i < 2; i++) {
	            context.drawImage(layer.img, layer.x + i * layer.width, 0);
	        }
	        layer.x -= layer.speed;
	        if (layer.speed-index <= 7) {
				layer.speed += 0.001;
	        }

		});

	},

	displayTable: (data) => {
		const tableRows = document.getElementsByTagName("tr");
		for (let i=1; i<tableRows.length; i++) {
			(data[i-1].rank) ? tableRows[i].cells[0].innerHTML = data[i-1].rank : tableRows[i].cells[0].innerHTML = i;
			tableRows[i].cells[1].innerHTML = data[i-1].name;
			tableRows[i].cells[2].innerHTML = data[i-1].score;
		}
	},

	changeDisplay: (elements, displays) => {
		elements.forEach((element, index) => {
			element.style.display = displays[index];
		});
	},

	applyFontStyles: () => {
		context.font = "15pt Georgia";
		context.strokeStyle = "black";
		context.lineWidth = 3;
		context.fillStyle = "white";
	},

	addStartText: () => {
		const x = canvas.width/2;
		const y = canvas.height/2;
		context.textAlign = "center";
		graphics.addText("Press any key to start", x, y);
	},

	addText: (text, x, y) => {
		graphics.applyFontStyles();
		context.strokeText(text, x, y);
		context.fillText(text, x, y);
	},

	drawInGameInfo: (score=0, lives=3, heart) => {
		const livesText = "Lives: ";
		const scoreText = "Score: ";
		const x = 30;
		const y = 40;

		context.textAlign = "start";
		graphics.addText(livesText, x, y);
		graphics.addText(scoreText, x, y+30);
		graphics.addText(score, x+65, y+29);

		for (let i=0; i < lives; i++) {
			heart.drawFrame();
			heart.x += heart.scaledWidth + 3; 
		} 
		heart.x = 90;
	},
}

module.exports = graphics;
},{}],6:[function(require,module,exports){
const graphics = require('./graphics.js');
const start = require('./start.js');
const Sprite = require('./classes/Sprite.js');
const Wizard = require('./classes/Wizard.js');

let startGame = false;
let backgroundImages = [
		new Sprite('../assets/backTrees.png',0),
		new Sprite('../assets/forestLights.png',1),
		new Sprite('../assets/middleTrees.png',2),
		new Sprite('../assets/frontTrees.png',3)
	];
let heart = new Sprite('../assets/heart.png', 0, 90, 27, 541, 600, 47, 87, 18, 20.4);
let wizard = new Wizard('../assets/sotaroSprite.png');
 
window.addEventListener('load', () => {
	graphics.drawStartScreen(wizard, backgroundImages, heart);
}, false);

window.addEventListener('keydown', (event) => {
	if (!startGame) {
		event.preventDefault();
		start();
		startGame = true;
	}
});
},{"./classes/Sprite.js":2,"./classes/Wizard.js":3,"./graphics.js":5,"./start.js":8}],7:[function(require,module,exports){
const graphics = require('./graphics.js')

module.exports = function leaderboard(data, endScreen, gameOver, buttons, bottomButton, endScore) {
	endScreen.style.height = "62%";
	graphics.changeDisplay([leaderboardPage, buttons[0], buttons[2], bottomButton[1], endScore],
			["flex", "none", "flex", "inline-block", "none"]);
	graphics.displayTable(data);
	gameOver.innerHTML = "Leaderboard";
}
},{"./graphics.js":5}],8:[function(require,module,exports){
const graphics = require('./graphics.js');
const endGame = require('./endscreen.js');
const Sprite = require('./classes/Sprite.js');
const Wizard = require('./classes/Wizard.js');

function randomValue(max, min) {
	return Math.floor(Math.random()*(max-min+1)) + min;
};

function didMakeContact(object, item) {
	let rect1 = {
		right: object.x + object.scaledWidth,
		left: object.x,
		top: object.y,
		bottom: object.y + object.scaledHeight
	};
	let rect2 = {
		right: item.x + item.scaledWidth,
		left: itemLeft = item.x,
		top: item.y,
		bottom: item.y + item.scaledHeight
	};
		
	let contact = !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);

	return contact;
};

module.exports = function() {
	let backgroundImages = [
		new Sprite('../assets/backTrees.png',0),
		new Sprite('../assets/forestLights.png',1),
		new Sprite('../assets/middleTrees.png',2),
		new Sprite('../assets/frontTrees.png',3)
	];
	let heart = new Sprite('../assets/heart.png', 0, 90, 27, 541, 600, 47, 87, 18, 20.4);
	let wizard = new Wizard('../assets/sotaroSprite.png');

	let score = 0;
	let lives = 3;
	let fireballs = [];
	let enemies = [];
	let enemySpeed = -7;
	enemies.push(new Sprite('../assets/enemies.png', enemySpeed, 650, randomValue(260,130), 46, 55, 5, 771, 64, 77, 0));
	enemies[0].attackedWizard = false;

	let frameCount = 0;
	let attackCount = 0;
	let enemyFrameCount = 0;

	let doneJumping = true;
	let isJumping = false;
	let isAttacking = false;
	let startFireball = false;
	let fireballMoving = false;
	let gameOver = false;
	let showEndScreen = false;

	function jumpAnimation() { 
		const jumpHeight = 100;
		if (!isAttacking && !doneJumping) {
			doneJumping = wizard.jump();
			if (doneJumping) {
				isJumping = false;
				wizard.maxHeight = jumpHeight;
			}
			frameCount = 0;
		}
	}

	function attackAnimation() {
		const attackCycleCount = 5;
		attackCount++;
		startFireball = wizard.attack();
		if (attackCount >= attackCycleCount) {
			isAttacking = false;
			attackCount = 0;
			if (wizard.y < wizard.minHeight) {
				wizard.maxHeight = wizard.y;
			}
		}
		frameCount = 0;
	}

	function fireballAnimation(fireballArray) {
		fireballArray = fireballArray.filter((fireball) => {
			fireball.updateScaledValues();
			if (fireball.speed !== null) {
				fireball.drawFrame();
			};
			fireball.x += fireball.speed;
			if (fireball.x >= canvas.width + 26) {
				fireball.speed = null;
			}
			else {
				enemies = enemies.filter((enemy) => {
					if (fireball.speed !== null) {
					if (didMakeContact(fireball, enemy)) {
						enemy.speed = null;
						fireball.speed = null;
						if (enemy.x < canvas.width) {
						 	score++;
						} 
					}
					};
					return enemy.speed !== null;
				}); 
			}
			return fireball.speed !== null;
		});

		if (fireballArray.length < 1) {
			fireballMoving = false;
		}

	}

	function drawEnemies() {
		const maxYPos = 130;
		const minYPos = 260;
		const enemyFrameThreshold = 75;
		
		wizard.hurt = false;	
		enemyFrameCount++;

		if (enemyFrameCount > enemyFrameThreshold) {
			let yPos = randomValue(maxYPos, minYPos);
			let enemy = new Sprite('../assets/enemies.png', enemySpeed, 650, yPos, 46, 55, 5, 771, 64, 77, 0);
			enemy.attackedWizard = false;
			enemies.push(enemy); 
			let newYPos = randomValue(maxYPos, minYPos);
			if (randomValue(2,1) === 2) {
				while (Math.abs(yPos - newYPos) <= enemies[0].scaledHeight) {
					newYPos = randomValue(maxYPos, minYPos);
				}
				newEnemy = new Sprite('../assets/enemies.png', enemySpeed, 830, newYPos, 46, 55, 5, 771, 64, 77, 0);
				newEnemy.attackedWizard = false;
				enemies.push(newEnemy); 
			}
			enemyFrameCount = 0;
		}

		enemies = enemies.filter((enemy) => {
			enemy.drawFrame();
			enemy.x += enemy.speed;
			enemySpeed += -0.0003;
			
			if (didMakeContact(enemy, wizard)) {
				wizard.hurt = true;
				if (enemy.attackedWizard === false) {
					(lives > 1) ? lives-- : (lives--, gameOver=true);
				}
				enemy.attackedWizard = true;
			}

			if ((enemy.x + enemy.scaledWidth) < 0) {
				enemy.speed = null;
			}
			return enemy.speed !== null;
		});
	}

	function drawUI() {
		const jumpFrameThreshold = 1;
		const attackFrameThreshold = 3;

		frameCount++;
		let frameThreshold = 60/backgroundImages[3].speed;

		context.clearRect(0,0, canvas.width, canvas.height);

		graphics.drawBackground(backgroundImages);
		wizard.drawFrame();
		graphics.drawInGameInfo(score, lives, heart);
		drawEnemies();

		if (gameOver && wizard.y >= 230 && frameCount > 10) {
			frameCount = 0;
			showEndScreen = wizard.dead();
		}
		else {
			if (startFireball && !gameOver) {
				startFireball = false;
				fireballMoving = true;
				let x = wizard.x + wizard.width + 45;
				let y = wizard.y + 54;
				fireballs.push(new Sprite('../assets/sotaroSprite.png', 10, x, y, 17, 26, 482, 584));
				fireballAnimation(fireballs); 
			}
			else if (fireballMoving) {
				fireballAnimation(fireballs);
			}

			if (isAttacking && frameCount > attackFrameThreshold) {
				attackAnimation();
			}
			else if (isJumping && frameCount > jumpFrameThreshold) {
				jumpAnimation();
			}
		    else if (frameCount > frameThreshold) {
				wizard.walk();
				frameCount = 0;
			}
		}

		if (showEndScreen) {
			graphics.drawBackground(backgroundImages);
			wizard.drawFrame();
			graphics.drawInGameInfo(score, lives, heart);
			drawEnemies();
			endGame(score);
		}
		else {
			window.requestAnimationFrame(drawUI);
		}
	}

	window.addEventListener('keydown', (event) => {
		const spaceKey = 32;
		const aKey = 65;

		if (event.keyCode === spaceKey) {
			event.preventDefault();
			isJumping = true;
			doneJumping = false;
		}
		else if (event.keyCode === aKey) {
			event.preventDefault();
			if (!gameOver) {
				isAttacking = true;
			}
		}
	}, false);

	window.requestAnimationFrame(drawUI);
}
},{"./classes/Sprite.js":2,"./classes/Wizard.js":3,"./endscreen.js":4,"./graphics.js":5}]},{},[6]);
