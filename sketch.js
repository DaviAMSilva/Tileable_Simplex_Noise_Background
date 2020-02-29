const num = 1000;
const spacing = 30;
var particles = [];

// Cahnce to reset when hitting an edge
const resetChance = .5;
// For grid pattern
const cols = 40, rows = 25;
// Max and min velocity
const minVel = .1, maxVel = 2;

var tN;

function setup() {
	createCanvas(windowWidth, windowHeight);

	// Initializing my tileable noise function
	tN = new TileableNoise(.5, 0, width/2, 0, height/2);

	for (var i = 0; i < num; i++) {
		// Randomly
		// particles[i] = new Particle(random(width), random(height));
		
		// In a grid pattern
		particles[i] = new Particle((i%cols)*width/cols,floor(i/cols)*height/rows);
	}

	// noStroke();
	// for (var i = 0; i < width; i += spacing) {
	//    for (var j = 0; j < height; j += spacing) {
	//       fill(((tN.eval2D(i, j))) * 255);
	//       rect(i, j, spacing, spacing);
	//    }
	// }

	background(21, 8, 50);
}

function draw() {
	for (p of particles) {
		// var angle = map(tN.eval2D(p.pos.x, p.pos.y), 0, 1, 0, TWO_PI) * 8;
		var angle = map(tN.eval2D(p.pos.x, p.pos.y), 0, 1, 0, TWO_PI) * 40;
		var vel = map(dist(mouseX, mouseY, pmouseX, pmouseY), 0, 100, minVel, maxVel, true);
		var direction = p5.Vector.fromAngle(angle).setMag(vel);

		p.update(direction);
		p.move();
		p.handleEdges();
		p.draw();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	setup();
}

function keyTyped() {
	background(21, 8, 50);
	tN.seed();
	for (p of particles) p.vel.mult(0);
}