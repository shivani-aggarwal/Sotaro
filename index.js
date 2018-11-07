const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

let backgroundImages = [
	new MovingImage('./assets/backTrees.png',0),
	new MovingImage('./assets/forestLights.png',1),
	new MovingImage('./assets/middleTrees.png',2),
	new MovingImage('./assets/frontTrees.png',3)
];

let wizard = new Wizard('./assets/sotaroSprite.png');
let frameCount = 0;
let isJumping = false;
let jumpCount = 0;

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

function drawUI() {
	frameCount++;
	let frameThreshold = 60/backgroundImages[3].speed;
	const jumpFrameThreshold = 1;
	const jumpCycleCount = 25;

	drawBackground();
	wizard.init();

	if (isJumping && frameCount > jumpFrameThreshold) {
		jumpCount++;
		wizard.jump();
		if (jumpCount >= jumpCycleCount) {
			isJumping = false;
			jumpCount = 0;
		}
		frameCount = 0;
	}
    else if (frameCount > frameThreshold) {
		wizard.walk();
		frameCount = 0;
	}
}

window.addEventListener('keydown', (event) => {
	if (event.keyCode === 32) {
		event.preventDefault();
		isJumping = true;
	}
}, false);

window.requestAnimationFrame(drawUI);