class Sprite extends MovingImage {
	constructor(img="",speed=0, x=0, y=0, height, width, 
				xSpriteCoord=0, ySpriteCoord=0, scaledHeight=0, scaledWidth=0,
				yVelocity=0, maxHeight=100, minHeight=230) {
		
		super(img, speed, x, y, height, width);
		this.xSpriteCoord = xSpriteCoord;
		this.ySpriteCoord = ySpriteCoord;
		this.scaledHeight = scaledHeight;
		this.scaledWidth = scaledWidth;
		this.yVelocity = yVelocity;
		this.maxHeight = maxHeight;
		this.minHeight = minHeight;
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

	init() {
		this.drawFrame();
	}
}