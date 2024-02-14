const COLS = 20;
const ROWS = 5;

let ballRadius;

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

	ballRadius = canvasSize / 100;

	ball = new Ball({
		x: width / 2,
		y: height - 30,
		radius: ballRadius,
	});

	accX = ball.position.x;
	accY = ball.position.y;

	const brickSize = canvasSize / COLS;

	for (let i = 0; i < COLS; i++) {
		for (let j = 0; j < ROWS; j++) {
			bricks.push(
				new Brick({
					x: i * brickSize,
					y: (j + 5) * brickSize,
					size: brickSize,
				})
			);
		}
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
			(abs(ball.position.x - brick.x1) < ballRadius ||
				abs(ball.position.x - brick.x2) < ballRadius)
		) {
			ball.velocity.x *= -1;
			brick.hide();
			return;
		}

		// checking y collision
		if (
			ball.position.x > brick.x1 &&
			ball.position.x < brick.x2 &&
			(abs(ball.position.y - brick.y1) < ballRadius ||
				abs(ball.position.y - brick.y2) < ballRadius)
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
