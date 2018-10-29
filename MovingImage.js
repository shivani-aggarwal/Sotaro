class MovingImage {
	constructor(img="",speed=0, x=0, y=0) {
		this.img = this.create(img);
		this.speed = speed;
		this.x = x;
		this.y = y;
	}

	create(src) {
		let image = new Image();
		image.src = src;
		return image;
	}

}