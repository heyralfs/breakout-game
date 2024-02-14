const BRICKS_AMOUNT = 0;

let ball,
	bricks = [];

let isMoving = false;

// acceleration helpers
let isPressed = false;
let accX, accY;

function setup() {
	const canvasSize = min(windowWidth, windowHeight) * 0.9;
	createCanvas(canvasSize, canvasSize);

	// create ball
	ball = new Ball(width / 2, height / 2);

	accX = ball.position.x;
	accY = ball.position.y;

	// create bricks
	// todo: draw a grid and create each brick within a different cell
	for (let i = 0; i < BRICKS_AMOUNT; i++) {
		bricks.push(new Brick(random(0, width), random(0, height)));
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
	}

	// draw bricks
	bricks.forEach((brick) => brick.draw());

	// draw ball
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
	if (isMoving) return;

	const acc = createVector(accX - mouseX, accY - mouseY);

	if (acc.mag() > MAX_VELOCITY) {
		acc.setMag(MAX_VELOCITY);
	}

	ball.accelerate(acc);

	isPressed = false;
}
