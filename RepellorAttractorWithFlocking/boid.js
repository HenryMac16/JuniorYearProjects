function Boid() {
	this.force = createVector(0,0);
	this.force2 = createVector(0, 0);
	this.acc = createVector(random(.1, .9), random(-.9, .1));
	this.vel = createVector(random(-3, 3), random(-3, 3));
	this.loc = createVector(random(width), random(height));
	this.col = color(random(255), random(255), random(255));
	this.r = 3.0;
	this.hit = false;
this.maxspeed = 3;
//  this.force = createVector(0,0); // Maximum speed
this.maxforce = 0.05;

this.run = function(boids) {
	this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

	this.render = function() {
		push();
			hit = collideCircleCircle(this.loc.x, this.loc.y,20, attractor.loc.x, attractor.loc.y,80);
			if(hit){
				fill(255, 0, 0);
			}
			else{
				fill(this.col);
			}

			noStroke();
  		ellipse(this.loc.x, this.loc.y, 20, 20);
			stroke(0, 255, 0);
			if(this.loc.dist(attractor.loc) < 120)
			line(this.loc.x, this.loc.y, attractor.loc.x, attractor.loc.y);
			stroke(255, 0, 0);
			if(this.loc.dist(repeller.loc) < 120)
			line(this.loc.x, this.loc.y, repeller.loc.x, repeller.loc.y);
		pop();


	}

	this.flock = function(boids) {
	var sep = this.separate(boids);   // Separation
  var ali = this.align(boids);      // Alignment
  var coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acc
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
	}

this.separate = function(boids) {
  var desiredseparation = 25.0;
  var steer = createVector(0,0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.loc,boids[i].loc);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.loc,boids[i].loc);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - vel
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.vel);
    steer.limit(this.maxforce);
  }
  return steer;
}

this.align = function(boids) {
  var neighbordist = 50;
  var sum = createVector(width/6,height/2);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.loc,boids[i].loc);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].vel);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum,this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0,0);
  }
}
this.seek = function(target) {
  var desired = p5.Vector.sub(target,this.loc);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired,this.vel);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
this.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0,0);   // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.loc,boids[i].loc);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].loc); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0,0);
  }
}


this.update = function(force) {
	this.vel.add(this.acc);
	  // Limit speed
	  this.vel.limit(this.maxspeed);
	  this.loc.add(this.vel);
	  this.acc.mult(0);

		this.force = force;
		this.force2 = force; // Incase we want to send f
		this.fear = random(100, 200);
		//calc force vector
		this.force = p5.Vector.sub(this.loc,repeller.loc);
		this.force2 = p5.Vector.sub(this.loc,attractor.loc);
		this.force.normalize();
		this.force.mult(.1);
		this.force2.normalize();
		this.force2.mult(.1);
		// If in range of Mover--run for your life!
		if(this.loc.dist(repeller.loc) < 50){
			this.applyForce(this.force);
			this.vel.add(this.force);
			this.vel.limit(random(3,6));
		} else if(this.loc.dist(repeller.loc) < 120){
			this.applyForce(this.force);
			this.vel.add(this.force);
			this.vel.limit(random(2,4));
		}else if(this.loc.dist(attractor.loc) < 100){
		this.applyForce(this.force2);
		this.vel.add(this.force2.mult(-1));
		this.vel.limit(random(3,6));
	} else if(this.loc.dist(attractor.loc) < 90){
		this.applyForce(this.force2);
		this.vel.add(this.force2.mult(-1));
		this.vel.limit(random(1,2));
	}else{
		//this.vel.add(this.force);
		this.vel.limit(1);
	}
	this.loc.add(this.vel);
		this.acc.mult(0);

}
	//bounce off walls
	this.borders = function() {
		if (this.loc.x < -this.r)  this.loc.x = width +this.r;
	  if (this.loc.y < -this.r)  this.loc.y = height+this.r;
	  if (this.loc.x > width +this.r) this.loc.x = -this.r;
	  if (this.loc.y > height+this.r) this.loc.y = -this.r;
	}
}
