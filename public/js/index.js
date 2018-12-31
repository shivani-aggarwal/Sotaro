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