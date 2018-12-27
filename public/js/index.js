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
	graphics.drawStartScreen(wizard, backgroundImages);
}, false);

window.addEventListener('keydown', (event) => {
	if (!startGame) {
		event.preventDefault();
		start();
		startGame = true;
	}
});

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