const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

let backgroundImages = [
	new MovingImage('./assets/backTrees.png',0),
	new MovingImage('./assets/forestLights.png',1),
	new MovingImage('./assets/middleTrees.png',2),
	new MovingImage('./assets/frontTrees.png',3)
];

let wizard = new Wizard('./assets/sotaroSprite.png');
let fireballs = [];
let enemies = [];
let enemySpeed = -7;
enemies.push(new Sprite('./assets/enemies.png', enemySpeed, 650, randomValue(260,130), 46, 55, 5, 771, 64, 77, 0, 100, 260));

let frameCount = 0;
let attackCount = 0;
let enemyCount = 0;

let doneJumping = true;
let isJumping = false;
let isAttacking = false;
let startFireball = false;
let fireballMoving = false;

const jumpFrameThreshold = 1;
const attackCycleCount = 5;
const attackFrameThreshold = 3;
const spaceKey = 32;
const aKey = 65;
const jumpHeight = 100;

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

function jump() { 
	if (!isAttacking && !doneJumping) {
		doneJumping = wizard.jump();
		if (doneJumping) {
			isJumping = false;
			wizard.maxHeight = jumpHeight;
		}
		frameCount = 0;
	}
}

function attack() {
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

function drawEnemies() {
	enemyCount++;

	if (enemyCount > 75) {
		let height = randomValue(260, 130);
		enemies.push(new Sprite('./assets/enemies.png', enemySpeed, 650, height, 46, 55, 5, 771, 64, 77, 0, 100, 260)); 
		let newHeight = randomValue(260,130);
		if (randomValue(2,1) === 2) {
			while (Math.abs(height - newHeight) <= enemies[0].scaledHeight) {
				newHeight = randomValue(260,130);
			}
			enemies.push(new Sprite('./assets/enemies.png', enemySpeed, 830, newHeight, 46, 55, 5, 771, 64, 77, 0, 100, 260)); 
		}
		enemyCount = 0;
	}

	enemies = enemies.filter((enemy) => {
		enemy.drawFrame();
		enemy.x += enemy.speed;
		enemySpeed += -0.0003;
		
		if (didMakeContact(enemy, wizard)) {
			wizard.hurt();
		}

		if ((enemy.x + enemy.scaledWidth) < 0) {
			enemy.speed = null;
		}
		return enemy.speed !== null;
	});
}

function drawUI() {
	frameCount++;
	let frameThreshold = 60/backgroundImages[3].speed;

	drawBackground();
	wizard.init();
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
		attack();
	}
	else if (isJumping && frameCount > jumpFrameThreshold) {
		jump();
	}
    else if (frameCount > frameThreshold) {
		wizard.walk();
		frameCount = 0;
	}
}

window.addEventListener('keydown', (event) => {
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