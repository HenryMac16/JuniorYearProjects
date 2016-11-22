function Repeller(){
  this.render = function(){
    this.hit = false;
    push();
      hit = collidePointRect(mouseX, mouseY, this.loc.x, this.loc.y, this.rad, this.rad);
      if(hit){
        fill(255, 0, 30);
      } else{
        fill(255);
      }
      rect(this.loc.x, this.loc.y, this.rad, this.rad);
    pop();
  }


}
