const COLS = 15;
const ROWS = 3;

let ballRadius;
let ball, bricks;

let maxVelocity;

// mouse interaction helpers
let accX, accY;

let gameOver = false;
let rounds;

function start() {
	const brickSize = width / COLS;
	ballRadius = brickSize / 3;
	maxVelocity = brickSize / 3;

	ball = new Ball({
		x: width / 2,
		y: height - ballRadius,
		radius: ballRadius,
	});

	accX = ball.position.x;
	accY = ball.position.y;

	bricks = [];

	for (let i = 0; i < COLS; i++) {
		for (let j = 0; j < ROWS; j++) {
			bricks.push(
				new Brick({
					x: i * brickSize,
					y: (j + 3) * brickSize,
					size: brickSize,
				})
			);
		}
	}

	const redBrickIndex = floor(random(0, bricks.length));
	bricks[redBrickIndex].red = true;

	rounds = 0;
	gameOver = false;
}

function setup() {
	rectMode(CORNERS);
	ellipseMode(CENTER);

	const canvasSize = min(windowWidth, windowHeight) * 0.9;
	createCanvas(canvasSize, canvasSize);

	start();
}

function draw() {
	if (gameOver) {
		renderGameOverScreen();
		return;
	}

	if (bricks.filter((brick) => brick.active).length === 1) {
		renderVictoryScreen();
		return;
	}

	background(0);

	if (rounds === 0) {
		renderHelperText();
	}

	renderRounds();

	if (mouseIsPressed) {
		drawForceVector();
	}

	bricks.forEach((brick) => {
		handleBrick(brick);
	});

	ball.update();
	ball.draw();
}

function mousePressed() {
	accX = mouseX;
	accY = mouseY;
}

function mouseReleased() {
	if (gameOver) {
		start();
	} else {
		const acc = createVector(accX - mouseX, accY - mouseY);
		if (acc.mag() > maxVelocity) {
			acc.setMag(maxVelocity);
		}
		ball.accelerate(acc);
		rounds++;
	}
}

function renderGameOverScreen() {
	push();
	const textSizeRef = height / 10;
	textSize(textSizeRef);
	fill(255, 0, 0);
	stroke(0);
	strokeWeight(4);
	textAlign(CENTER, CENTER);
	text("Game Over ☠️", width / 2, height / 2 - textSizeRef / 2);
	textSize(textSizeRef / 2);
	text("Click anywhere to restart.", width / 2, height / 2 + textSizeRef / 2);
	pop();
}

function renderVictoryScreen() {
	push();
	const textSizeRef = height / 10;
	textSize(textSizeRef);
	fill(0, 255, 0);
	stroke(0);
	strokeWeight(4);
	textAlign(CENTER, CENTER);
	text("Victory! 🎉", width / 2, height / 2 - textSizeRef / 2);
	textSize(textSizeRef / 2);
	text(
		`You won the game with ${rounds} moves!`,
		width / 2,
		height / 2 + textSizeRef / 2
	);
	textSize(textSizeRef / 3);
	text(`Click anywhere to play again.`, width / 2, height / 2 + textSizeRef);
	pop();
}

function renderHelperText() {
	push();
	fill(255, 255, 255);
	textSize(height / 20);
	textAlign(CENTER, CENTER);
	text("Don't hit the red brick", width / 2, height / 20);
	pop();
}

function renderRounds() {
	push();
	fill(255, 255, 255, 100);
	textSize(height / 20);
	textAlign(RIGHT, CENTER);
	text(rounds, width * 0.975, height / 20);
	pop();
}

function handleBrick(brick) {
	if (!brick.active) return;
	// checking x collision
	if (
		ball.position.y > brick.y1 &&
		ball.position.y < brick.y2 &&
		(abs(ball.position.x - brick.x1) < ballRadius ||
			abs(ball.position.x - brick.x2) < ballRadius)
	) {
		if (brick.red) {
			gameOver = true;
			brick.draw();
		} else {
			ball.reflect("HORIZONTAL");
			brick.hide();
		}
		return;
	}
	// checking y collision
	if (
		ball.position.x > brick.x1 &&
		ball.position.x < brick.x2 &&
		(abs(ball.position.y - brick.y1) < ballRadius ||
			abs(ball.position.y - brick.y2) < ballRadius)
	) {
		if (brick.red) {
			gameOver = true;
			brick.draw();
		} else {
			ball.reflect("VERTICAL");
			brick.hide();
		}
		return;
	}
	brick.draw();
}

function drawForceVector() {
	const strength = dist(accX, accY, mouseX, mouseY);
	push();
	stroke(map(strength, 0, width, 50, 255));
	line(accX, accY, mouseX, mouseY);
	pop();
}
