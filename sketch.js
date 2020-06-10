let circles = [];
let img;
const rate = 28;
const spawnRate = 10;
const growthRate = 1;
const maxLength = 50000;
const maxTries = 2000;
let drawImage = false;

function preload() {
	img = loadImage("photo.png");
}

function setup() {
	createCanvas(686 * 2, 920);
	pixelDensity(1);
	img.loadPixels();
}

function draw() {
	background(255);

	if (drawImage) {
		image(img, 686, 0);
		noLoop();
	}

	if (circles.length < maxLength) {
		for (let i = 0; i < spawnRate; i++) {
			spawnCircle(circles);
		}
	} else {
		console.log("FINISHED!");
		drawImage = true;
	}

	if (frameCount % rate == 0) {
		for (let circle of circles) {
			if (circle.hitEdge() || circle.hitCircle(circles)) {
				circle.keepGrowing = false;
			}
			if (circle.keepGrowing) {
				circle.grow();
			}
		}
	}
	for (let circle of circles) {
		circle.show();
	}
}

function mousePressed() {
	for (let circle of circles) {
		if (circle.hitEdge() || circle.hitCircle(circles)) {
			circle.keepGrowing = false;
		}
		if (circle.keepGrowing) {
			circle.grow();
		}
	}
	// for (let circle of circles) {
	// 	circle.grow();
	// }
	for (let circle of circles) {
		circle.show();
	}
	console.log("Done!");
}

function spawnCircle(list) {
	let tries = 0;
	while (true) {
		tries++;
		if (tries > maxTries) {
			console.log("FINISHED!");
			drawImage = true;
			return;
		}
		let x = floor(random(width / 4));
		let y = floor(random(height / 2));
		let i = floor(4 * (y * img.width + x) * 2);
		let c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2]);
		let potential = new Circle(x, y, c);
		let valid = true;
		for (let other of list) {
			let d = dist(potential.x, potential.y, other.x, other.y);
			if (d < potential.r + other.r) {
				valid = false;
			}
		}

		if (valid) {
			list.push(potential);
			return;
		}
	}
}
