const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

let startGame = false;
let backgroundImages = [
		new MovingImage('./assets/backTrees.png',0),
		new MovingImage('./assets/forestLights.png',1),
		new MovingImage('./assets/middleTrees.png',2),
		new MovingImage('./assets/frontTrees.png',3)
	];
let wizard = new Wizard('./assets/sotaroSprite.png');
startScreen();

window.addEventListener('keydown', (event) => {
	if (!startGame) {
		event.preventDefault();
		start();
		startGame = true;
	}
});

function startScreen() {

	backgroundImages.forEach((layer, index) => {
		layer.img.onload = function() {
			context.drawImage(layer.img, 0, 0);
		}
	});
	wizard.img.onload = function() {
		wizard.init();
		addCanvasText();
	}
}

function start() {

	let fireballs = [];
	let enemies = [];
	let enemySpeed = -7;
	enemies.push(new Sprite('./assets/enemies.png', enemySpeed, 650, randomValue(260,130), 46, 55, 5, 771, 64, 77, 0));

	let frameCount = 0;
	let attackCount = 0;
	let enemyFrameCount = 0;

	let doneJumping = true;
	let isJumping = false;
	let isAttacking = false;
	let startFireball = false;
	let fireballMoving = false;

	function drawBackground() { 

		backgroundImages.forEach((layer,index) => {
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

		window.requestAnimationFrame(drawUI);
	}

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
			fireball.drawFrame();
			fireball.x += fireball.speed;
			if (fireball.x >= canvas.width + 26) {
				fireball.speed = null;
			}
			else {
				enemies = enemies.filter((enemy) => {
					if (didMakeContact(fireball, enemy)) {
						enemy.speed = null;
					}
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
			enemies.push(new Sprite('./assets/enemies.png', enemySpeed, 650, yPos, 46, 55, 5, 771, 64, 77, 0)); 
			let newYPos = randomValue(maxYPos, minYPos);
			if (randomValue(2,1) === 2) {
				while (Math.abs(yPos - newYPos) <= enemies[0].scaledHeight) {
					newYPos = randomValue(maxYPos, minYPos);
				}
				enemies.push(new Sprite('./assets/enemies.png', enemySpeed, 830, newYPos, 46, 55, 5, 771, 64, 77, 0)); 
			}
			enemyFrameCount = 0;
		}

		enemies = enemies.filter((enemy) => {
			enemy.drawFrame();
			enemy.x += enemy.speed;
			enemySpeed += -0.0003;
			
			if (didMakeContact(enemy, wizard)) {
				wizard.hurt = true;
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

		drawBackground();
		wizard.init();
		addCanvasText();
		drawEnemies();

		if (startFireball) {
			startFireball = false;
			fireballMoving = true;
			let x = wizard.x + wizard.width + 45;
			let y = wizard.y + 54;
			fireballs.push(new Sprite('./assets/sotaroSprite.png', 10, x, y, 17, 26, 482, 584));
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
			isAttacking = true;
		}
	}, false);

	window.requestAnimationFrame(drawUI);
}

function randomValue(max, min) {
	return Math.floor(Math.random()*(max-min+1)) + min;
}

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
}

function addCanvasText(score=0) {
	const livesText = "Lives: ";
	const scoreText = "Score: ";
	const x = 30;
	const y = 40;

	context.font = "15pt Calibri";
	context.strokeStyle = "black";
	context.lineWidth = 3;
	context.strokeText(livesText, x, y);
	context.strokeText(scoreText, x, y+30);
	context.strokeText(score, x+55, y+30);
	context.fillStyle = "white";
	context.fillText(livesText, x, y);
	context.fillText(scoreText, x, y+30);
	context.fillText(score, x+55, y+30);
}