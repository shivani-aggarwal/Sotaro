class Sprite {
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