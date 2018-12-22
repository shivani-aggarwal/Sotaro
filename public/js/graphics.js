const graphics = {
	drawStartScreen: (wizard, images) => {
		images.forEach((layer, index) => {
			context.drawImage(layer.img, 0, 0);
		});

		wizard.drawFrame();
		graphics.addStartText();
		graphics.drawInGameInfo();
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

	drawInGameInfo: (score=0, lives=3) => {
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