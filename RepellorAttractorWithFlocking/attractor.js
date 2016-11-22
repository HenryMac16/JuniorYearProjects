function Attractor(){
  this.render = function(){
    this.hit = false;
    this.rplForce = -1;
    push();
      this.hit = collidePointCircle(mouseX, mouseY, this.loc.x, this.loc.y, 80);
      if(hit){
      //  this.rplForce = -1;
        fill(0, 255, 0);
      } else {
        fill(255);
      //  this.rplForce = 1;
      }

      ellipse(this.loc.x, this.loc.y, 80, 80);
    pop();
  }

  this.returnRpl = function(){
    return this.hit;
  }
}
