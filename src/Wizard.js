 class Wizard extends MovingImage {
	constructor(img,speed=0, x=30, y=230, height=69, width=46, 
				xSpriteCoord=70, ySpriteCoord=17, scaledHeight=120, scaledWidth=80,
				walkIndex=0, jumpIndex=0) {
		super(img, speed, x, y, height, width);
		this.xSpriteCoord = xSpriteCoord;
		this.ySpriteCoord = ySpriteCoord;
		this.scaledHeight = scaledHeight;
		this.scaledWidth = scaledWidth;

		this.walkIndex = walkIndex;
		this.jumpIndex = jumpIndex;
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

	jump() {
		const jumpingSprite = [
			{
				xSpriteCoord: 106,
				ySpriteCoord: 187,
				width: 44,
				height: 78,
				yVelocity: -10
			},
			{
				xSpriteCoord: 171,
				ySpriteCoord: 189,
				width: 43,
				height: 78,
				yVelocity: 10
			},
			{
				xSpriteCoord: 70,
				ySpriteCoord: 17,
				width: 46,
				height: 69,
				yVelocity: 0
			}
		]; 

		this.xSpriteCoord = jumpingSprite[this.jumpIndex].xSpriteCoord;
		this.ySpriteCoord = jumpingSprite[this.jumpIndex].ySpriteCoord;
		this.width = jumpingSprite[this.jumpIndex].width;
		this.height = jumpingSprite[this.jumpIndex].height;
		this.updateScaledValues();

		switch(this.jumpIndex) {
			case 0: 
				this.y += jumpingSprite[this.jumpIndex].yVelocity;
				if (this.y === 110) {
					this.jumpIndex++;
				}
				break;
			case 1: 
				this.y += jumpingSprite[this.jumpIndex].yVelocity;
				if (this.y === 230) {
					this.jumpIndex++;
				}
				break;
			default:
				this.y = 230;
				this.jumpIndex++;
				break;
		}

		this.drawFrame();

		if (this.jumpIndex >= jumpingSprite.length) {
			this.jumpIndex = 0;
		}

	}

	attack() {

	}

	hurt() {

	}

	death() {
		
	}

}