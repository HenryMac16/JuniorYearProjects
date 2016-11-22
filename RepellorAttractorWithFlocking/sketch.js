var mover;
var boids = [];
var numBoids = 50;
var attractor;
var repeller;
var sound;
var flock;

//function preload(){
    //sound = loadSound("BobRoss.mp3");
//}//


function setup() {
	var cnv = createCanvas(900, 800);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;

	cnv.position(x, y);
	fill(200, 200, 0);



	//attractor = new Mover(false);
	Boid.prototype = new Mover();
	Attractor.prototype = new Mover();
	Repeller.prototype = new Mover();
	attractor = new Attractor();
	repeller = new Repeller();
	flock = new Flock();
	for (var i = 0; i < 100; i++) {
    var b = new Boid(width/2,height/2);
    flock.addBoid(b);
  }
//	sound.loop();
}

function draw() {
	//background(62);
	push()
		fill(120, 120, 140, 25);
		rect(0, 0, width, height);
	pop();
	repeller.run();
	attractor.run();
	flock.run();

	//attractor.run();
	for (var i = 0; i < boids.length; i++) {
		boids[i].run();
	}

}

function changeReppelrForce() {
  repeller.force = createVector(random(-1, 1), random(-1, 1));
}
setInterval(changeReppelrForce, 1000);


function loadBoids() {
//	for (var i = 0; i < numBoids; i++) {
	//	boids.push(new Boid());
//	}
}





// Boid.prototype.render = function() {
// 	fill(200, 30, 150);
// 	ellipse(this.loc.x, this.loc.y, 30, 30);
// }
