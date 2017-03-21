var bullets = [];

function Bullet(x,y) {
  this.x = x;
  this.y = y;
  //console.log(this.y);
//  this.target = target,
};

Bullet.prototype.r = 50/4;
Bullet.prototype.speed = 30*2;

Bullet.prototype.move = function() {
  //find unit vector
  var xDist = game.canvas.x+25/2-this.x; //"+rectWidth/2" because we want bullet to go for center of enemy no top left corner
  var yDist = game.canvas.y+25/2-this.y;
  var dist = Math.sqrt(xDist*xDist+yDist*yDist);
  this.x = this.x+this.speed*xDist/dist;
  this.y = this.y+this.speed*yDist/dist;

};

Bullet.prototype.draw = function() {
  game.context.beginPath();
  game.context.arc(this.x,this.y,this.r,0,2*Math.PI);
  game.context.fillStyle='blue';
  game.context.fill();
};

Bullet.prototype.checkCollision = function() {
  var xDist = game.canvas.x+25/2-this.x; //"+rectWidth/2" because we want bullet to go for center of enemy no top left corner
  var yDist = game.canvas.y+25/2-this.y;
  if(Math.sqrt(xDist*xDist+yDist*yDist) < 30){
    return true;
  } else {
    return false;
  }
};
