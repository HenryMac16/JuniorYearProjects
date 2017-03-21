function Tower(x, y, idImg){//idImg){
  this.x = x;
  this.y = y;
  this.i = idImg;
}


Tower.prototype.drawTower = function(){
  var img = new Image();
//  var imagesPath =

  img.src = ("images/t" + this.i + ".png" );
  //game.context.beginPath();
  game.context.save();
  game.context.fill();
  //game.context.setTransform(1, 0, 0, 1, 0, 0);

  game.context.stroke();
  var angle = Math.atan2(game.canvas.y - (this.y -25), game.canvas.x - (this.x -25));
  //console.log(img.naturalHeight);
  //console.log(angle);
  game.context.translate(this.x, this.y);
  game.context.rotate(90 + angle);
  game.context.drawImage(img, -25, -25);
  game.context.restore();
}

Tower.prototype.rateOfFire = 10; //smaller means more bullets per second
Tower.prototype.range = 50*5;


Tower.prototype.findUnitVector = function() { //if there is no target, dont bother calculating unit vector
  var xDist = game.canvas.x-this.x;
  var yDist = game.canvas.y-this.y;
  console.log(this.r);
  var dist = Math.sqrt(xDist*xDist+yDist*yDist);
  this.xFire = this.x+25*xDist/dist; //where turret ends and bullets start
  this.yFire = this.y+25*yDist/dist;

};

Tower.prototype.fire = function() {
  this.rateOfFire--;
  if( this.rateOfFire <=0) {
    bullets.push(new Bullet(this.xFire, this.yFire, game.canvas.x, game.canvas.y));
    //reset this objects rateOfFire to the prototypes
    this.rateOfFire = this.constructor.prototype.rateOfFire;
  };
};



var towerClasses = [Tower];
