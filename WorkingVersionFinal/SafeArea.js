function SafeArea(){
  //this.loc = createVector(mouseX, mouseY);
  
  this.render = function() {
    image(pen, 400, 220, 200, 200);
	  textSize(24);
	  stroke(200, 100, 50);
	  fill(200, 100, 50);
  }
  this.loadPoly = function() {
    poly[0] = createVector(400,420);
  	poly[1] = createVector(400,220);
    poly[2] = createVector(600,220);
    poly[3] = createVector(600,420);
  }
}
