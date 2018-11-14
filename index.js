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

let frameCount = 0;
let attackCount = 0;

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
const groundYPos = 230;
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
		if (wizard.y < groundYPos) {
			wizard.maxHeight = wizard.y;
		}
	}
	frameCount = 0;
}

function fireballAnimation(fireballArray) {

	fireballArray.forEach((fireball) => {
		fireball.updateScaledValues();
		fireball.drawFrame();
		fireball.x += fireball.speed;
		if (fireball.x >= canvas.width + 26) {
			fireball.speed = null;
		}
	});

	fireballArray = fireballArray.filter((fireball) => {
		return fireball.speed !== null;
	});

	if (fireballArray.length < 1) {
		fireballMoving = false;
	}

}

function drawUI() {
	frameCount++;
	let frameThreshold = 60/backgroundImages[3].speed;

	drawBackground();
	wizard.init();

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