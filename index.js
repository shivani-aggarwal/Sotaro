const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

createImage = (src) => {
	image = new Image();
	image.src = src;
	return image;
}

backgroundImages = [
	{
		img: createImage("./assets/backTrees.png"),
		layerSpeed: 0,
		x: 0
	},
	{
		img: createImage("./assets/forestLights.png"),
		layerSpeed: 1,
		x: 0
	},
	{
		img: createImage("./assets/middleTrees.png"),
		layerSpeed: 2,
		x: 0
	},
	{
		img: createImage("./assets/frontTrees.png"),
		layerSpeed: 3,
		x: 0
	}
];

function drawBackground() {

	backgroundImages.forEach((layer,index) => {
			if (layer.x < -650) {
				layer.x = 0;
			}

			for (var i = 0; i < 2; i++) {
              context.drawImage(layer.img, layer.x + i * layer.img.width, 0);
           	}

           	layer.x -= layer.layerSpeed;

           	if (layer.layerSpeed-index <= 7) {
				layer.layerSpeed += 0.001;
           	}

	});
}

setInterval(drawBackground, 20);
