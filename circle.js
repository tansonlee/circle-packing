class Circle {
	constructor(x, y, c) {
		this.x = x;
		this.y = y;
		this.r = 1;
		this.keepGrowing = true;
		this.c = c;
	}

	show() {
		fill(this.c);
		noStroke();
		//fill(255, 0, 200, 100);
		ellipse(this.x*2, this.y*2, this.r * 2, this.r * 2);
	}

	grow() {
		this.r += growthRate;
	}

	hitEdge() {
		return (this.x - this.r < 0) || (this.x + this.r > width) || (this.y - this.r < 0) || (this.y + this.r > height);
	}

	hitCircle(circles) {
		for (let circle of circles) {
			if (circle != this) {
				let d = dist(this.x, this.y, circle.x, circle.y);
				if (d*2 < this.r + circle.r) {
					return true;
				}
			}
		}
		return false;
	}


}