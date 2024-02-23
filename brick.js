class Brick {
	constructor({ x, y, size }) {
		this.x1 = x;
		this.y1 = y;
		this.x2 = x + size;
		this.y2 = y + size;
		this.active = true;
		this.red = false;
	}

	draw() {
		if (this.active) {
			push();
			if (this.red) {
				fill(255, 0, 0);
			} else {
				fill(255);
			}
			rect(this.x1, this.y1, this.x2, this.y2);
			pop();
		}
	}

	hide() {
		this.active = false;
	}
}
