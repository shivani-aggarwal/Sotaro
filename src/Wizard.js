 class Wizard extends MovingImage {
	constructor(img,speed=3, xCanvas=30, yCanvas=230, height=69, width=46, 
				xSpriteCoord=70, ySpriteCoord=17, scaledHeight=120, scaledWidth=80,
				walkIndex=0) {
		super(img, speed, xCanvas, yCanvas, height, width);
		this.xSpriteCoord = xSpriteCoord;
		this.ySpriteCoord = ySpriteCoord;
		this.scaledHeight = scaledHeight;
		this.scaledWidth = scaledWidth;

		this.walkIndex = walkIndex;
	}

	updateScaledValues() {
		const scale = 1.74;
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

	walk() {
		const walkingSprite = [
			{
				xSpriteCoord: 47,
				ySpriteCoord: 109,
				width: 39,
				height: 68
			},
			{
				xSpriteCoord: 127,
				ySpriteCoord: 106,
				width: 43,
				height: 69
			},
			{
				xSpriteCoord: 208,
				ySpriteCoord: 107,
				width: 45,
				height: 68
			},
			{
				xSpriteCoord: 287,
				ySpriteCoord: 105,
				width: 43,
				height: 69
			}
		];

		this.xSpriteCoord = walkingSprite[this.walkIndex].xSpriteCoord;
		this.ySpriteCoord = walkingSprite[this.walkIndex].ySpriteCoord;
		this.width = walkingSprite[this.walkIndex].width;
		this.height = walkingSprite[this.walkIndex].height;
		this.updateScaledValues();

		this.drawFrame();

		this.walkIndex++;
		if (this.walkIndex >= walkingSprite.length) {
			this.walkIndex = 0;
		}

	}

}