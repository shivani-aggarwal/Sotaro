class MovingImage {
	constructor(img="",speed=0, x=0, y=0, height=650, width=650) {
		this.img = this.create(img, height, width);
		this.speed = speed;
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
	}

	create(src, height, width) {
		let image = new Image();
		image.src = src;
		image.height = height;
		image.width = width;
		return image;
	}

}