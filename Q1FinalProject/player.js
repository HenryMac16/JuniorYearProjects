function Player(){
  this.loc = createVector(mouseX, mouseY);
  this.render = function() {
    fill(15, 100, 0);
    image(game.shep, this.loc.x, this.loc.y, 40, 40);
  }
}
