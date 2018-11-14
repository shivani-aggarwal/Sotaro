class Wizard extends Sprite {
	constructor(img,speed=0, x=30, y=230, height=69, width=46, 
				xSpriteCoord=70, ySpriteCoord=17, scaledHeight=120, scaledWidth=80,
				yVelocity=0, maxHeight=100,
				walkIndex=0, jumpIndex=0, attackIndex=0) {

		super(img, speed, x, y, height, width, 
			  xSpriteCoord, ySpriteCoord, scaledHeight, scaledWidth);
		this.maxHeight = maxHeight;
		this.walkIndex = walkIndex;
		this.jumpIndex = jumpIndex;
		this.attackIndex = attackIndex;
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
		const groundYPos = 230;

		let initalVelocity = -10;
		if (this.yVelocity !== 0) {
			initalVelocity = this.yVelocity;
		}

		const jumpingSprite = [
			{
				xSpriteCoord: 106,
				ySpriteCoord: 187,
				width: 44,
				height: 78,
				yVelocity: initalVelocity
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

		let doneJumping = false; 
	 
		if ( (this.y === this.maxHeight && this.yVelocity === -10) ) {
			this.jumpIndex = 1;
		}
		else if ( (this.y === groundYPos && this.yVelocity === 10) || 
			      (this.y === groundYPos && this.jumpIndex === 1) ) {
			this.jumpIndex = 2; 
		}

		this.xSpriteCoord = jumpingSprite[this.jumpIndex].xSpriteCoord;
		this.ySpriteCoord = jumpingSprite[this.jumpIndex].ySpriteCoord;
		this.width = jumpingSprite[this.jumpIndex].width;
		this.height = jumpingSprite[this.jumpIndex].height;
		this.updateScaledValues();

		this.yVelocity = jumpingSprite[this.jumpIndex].yVelocity;
		this.y += this.yVelocity;

		this.drawFrame();

		if (this.jumpIndex >= 2) {
			this.jumpIndex = 0;
			doneJumping = true;
			return doneJumping;
		}
	}

	attack() {
		const groundYPos = 230;

		const attackingSprite = [
			{
				xSpriteCoord: 83,
				ySpriteCoord: 551,
				width: 49,
				height: 70
			},
			{
				xSpriteCoord: 152,
				ySpriteCoord: 553,
				width: 59,
				height: 71
			},
			{
				xSpriteCoord: 232,
				ySpriteCoord: 554,
				width: 56,
				height: 70
			},
			{
				xSpriteCoord: 315,
				ySpriteCoord: 555,
				width: 49,
				height: 68
			},
			{
				xSpriteCoord: 385,
				ySpriteCoord: 556,
				width: 46,
				height: 69
			}
		];

		let startFireball = false;

		this.xSpriteCoord = attackingSprite[this.attackIndex].xSpriteCoord;
		this.ySpriteCoord = attackingSprite[this.attackIndex].ySpriteCoord;
		this.width = attackingSprite[this.attackIndex].width;
		this.height = attackingSprite[this.attackIndex].height;
 		if (this.y <= this.maxHeight || this.y >= groundYPos) {
			this.yVelocity *= -1;
		}
		if (this.y === groundYPos) {
			this.yVelocity = 0;
		}
		this.y += this.yVelocity;

		this.updateScaledValues();

		this.drawFrame();

		if (this.attackIndex === 1) {
			startFireball = true;
		}

		this.attackIndex++;
		if (this.attackIndex >= attackingSprite.length) {
			this.attackIndex = 0;
		}

		return startFireball;
	}

	hurt() {

	}

	death() {
		
	}

}