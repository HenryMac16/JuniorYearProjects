function SafeArea(){
  //this.loc = createVector(mouseX, mouseY);
  this.pen = loadImage("pen (1).png");
  this.poly = [];
  this.render = function() {
    image(this.pen, 400, 220, 200, 200);
	  textSize(24);
	  stroke(200, 100, 50);
	  fill(200, 100, 50);
  }
  this.loadPoly = function() {
    this.poly[0] = createVector(400,420);
  	this.poly[1] = createVector(400,220);
    this.poly[2] = createVector(600,220);
    this.poly[3] = createVector(600,420);
  }
}
