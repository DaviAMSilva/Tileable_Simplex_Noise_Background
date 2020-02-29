class Particle {

	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector();
		this.acc = createVector();

		this.r = random(1, 2);
		this.alpha = random(0, 255);

		var ranNum = round(random(1, 3));
		if (ranNum === 1) {
			this.color = color(69, 33, 124, this.alpha);
		} else if (ranNum === 2) {
			this.color = color(7, 153, 242, this.alpha);
		} else if (ranNum === 3) {
			this.color = color(255, 255, 255, this.alpha);
		}
	}

	update(dir) {
		this.acc = dir;
	}

	move() {
		this.oldPos = this.pos.copy();
		this.vel.add(this.acc);
		this.vel.mult(.6);
		this.pos.add(this.vel);
	}

	draw() {
		stroke(this.color);
		strokeWeight(this.r);
		// point(this.pos.x, this.pos.y);
		if (!this.teleported) line(this.pos.x, this.pos.y, this.oldPos.x, this.oldPos.y);
	}

	handleEdges() {
		this.teleported = false;
		if (this.pos.x < 0 ||
			this.pos.x > width ||
			this.pos.y < 0 ||
			this.pos.y > height) {
			if (random() < resetChance) {
				this.pos.x = random(width);
				this.pos.y = random(height);
			} else {
				this.pos.x = (this.pos.x + width) % width;
				this.pos.y = (this.pos.y + height) % height;
			}
			this.teleported = true;
		}
	}

}