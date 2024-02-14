const FRICTION = 0.01; // between 0 and 1

const MIN_VELOCITY = 0.3;
const MAX_VELOCITY = 30;

const INITIAL_VELOCITY = 0;

class Ball {
	constructor({ x, y, radius }) {
		this.position = createVector(x, y);
		this.velocity = createVector(INITIAL_VELOCITY, INITIAL_VELOCITY);
		this.radius = radius;
		this.diameter = radius * 2;
	}

	draw() {
		ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
	}

	update() {
		// check collision with walls
		if (
			this.position.x + this.radius > width ||
			this.position.x - this.radius < 0
		) {
			this.velocity.x *= -1;
		}
		if (
			this.position.y + this.radius > height ||
			this.position.y - this.radius < 0
		) {
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
