const BRICKS_AMOUNT = 100;

const COLLISION_DIST = 10;

let ball,
	bricks = [];

// mouse interaction helpers
let isMoving = false;
let isPressed = false;
let accX, accY;

function setup() {
	rectMode(CORNERS);
	ellipseMode(CENTER);

	const canvasSize = min(windowWidth, windowHeight) * 0.9;
	createCanvas(canvasSize, canvasSize);

	ball = new Ball(width / 2, height / 2, canvasSize / 50);

	accX = ball.position.x;
	accY = ball.position.y;

	// todo: draw a grid and create each brick within a different cell
	for (let i = 0; i < BRICKS_AMOUNT; i++) {
		bricks.push(
			new Brick(random(0, width), random(0, height), canvasSize / 25)
		);
	}
}

function draw() {
	background(0);

	if (ball.velocity.mag() > 0) {
		isMoving = true;
	} else {
		isMoving = false;
	}

	if (isPressed) {
		stroke(255, 255, 0);
		line(accX, accY, mouseX, mouseY);
		stroke(0);
	}

	bricks.forEach((brick) => {
		if (!brick.active) return;

		// checking x collision
		if (
			ball.position.y > brick.y1 &&
			ball.position.y < brick.y2 &&
			(abs(ball.position.x - brick.x1) < COLLISION_DIST ||
				abs(ball.position.x - brick.x2) < COLLISION_DIST)
		) {
			ball.velocity.x *= -1;
			brick.hide();
			return;
		}

		// checking y collision
		if (
			ball.position.x > brick.x1 &&
			ball.position.x < brick.x2 &&
			(abs(ball.position.y - brick.y1) < COLLISION_DIST ||
				abs(ball.position.y - brick.y2) < COLLISION_DIST)
		) {
			ball.velocity.y *= -1;
			brick.hide();
			return;
		}

		brick.draw();
	});

	ball.update();
	ball.draw();
}

function mousePressed() {
	if (isMoving) return;
	isPressed = true;
	accX = mouseX;
	accY = mouseY;
}

function mouseReleased() {
	if (isMoving || !isPressed) return;

	const acc = createVector(accX - mouseX, accY - mouseY);

	if (acc.mag() > MAX_VELOCITY) {
		acc.setMag(MAX_VELOCITY);
	}

	ball.accelerate(acc);

	isPressed = false;
}
