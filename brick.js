class Brick {
	constructor(x, y, size) {
		this.x1 = x;
		this.y1 = y;
		this.x2 = x + size;
		this.y2 = y + size;
		this.active = true;
	}

	draw() {
		if (this.active) {
			fill(255);
			rect(this.x1, this.y1, this.x2, this.y2);
		}
	}

	hide() {
		this.active = false;
	}
}
