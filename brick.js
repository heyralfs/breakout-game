const SIZE = 30;

class Brick {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		fill(255);
		rect(this.x, this.y, SIZE, SIZE);
	}
}
