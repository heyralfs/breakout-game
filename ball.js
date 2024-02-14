const DIAMETER = 12;

const FRICTION = 0.015; // between 0 and 1

const MIN_VELOCITY = 0.3;
const MAX_VELOCITY = 20;

const INITIAL_VELOCITY = 0;

class Ball {
	constructor(x, y) {
		// with vectors
		this.position = createVector(x, y);
		this.velocity = createVector(INITIAL_VELOCITY, INITIAL_VELOCITY);
	}

	draw() {
		ellipse(this.position.x, this.position.y, DIAMETER, DIAMETER);
	}

	update() {
		// check collision
		if (this.position.x > width || this.position.x < 0) {
			this.velocity.x *= -1;
		}
		if (this.position.y > height || this.position.y < 0) {
			this.velocity.y *= -1;
		}

		// update position
		this.position.add(this.velocity);

		// update velocity
		this.velocity.mult(1 - FRICTION);
		if (this.velocity.mag() < MIN_VELOCITY) {
			this.velocity.setMag(0);
		}
	}

	accelerate(acc) {
		this.velocity = acc;
	}
}
