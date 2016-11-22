'use strict'
function Game() {
  this.numBoids = 50;
  this.boids = [];
  this.randomPoly = []
  this.hit = false;
  this.poly = [];
  this.player;
  this.sanke;
  this.sheep;
  this.index = 0;
  this.shep;
  this.counts = 10;
  this.countM = 0;
  this.saved = 0;
  this.bImage;
  this.counterText;
  this.pen;
  this.sheepIn = 0;
  this.addBoids = 50;
  this.startS;
  this.roundNumber= 1;
  this.passSheep = 0;
  this.snekArr = [];
  this.snakeNum = 1;
  this.wolfI;
  this.sA;
  this.datas;
  this.isRunning = false;
  this.startButton = new StartButton(this, 300, 250, 150, 75);
  this.ended;

  
  //json = {};
 this.init = function(){
    this.sA = new SafeArea();
    this.started = false;
    this.ended = false;
    frameRate(600);
    this.wolfI = loadImage("wolf.png");
    this.startS = loadImage("start.png");
    
    this.bImage = loadImage("grass2.png");
    this.sheep = loadImage("sheeps.png");
    this.shep = loadImage("shep.png");
	  var cnv = createCanvas(1100, 900);
	  var x = (windowWidth - width) / 2;
	  var y = (windowHeight - height) / 2;
	  cnv.position(x, y);
	  stroke(200, 200, 0);
  fill(200, 200, 200);
	  Boid.prototype = new Mover();
	  this.loadBoids();
	  this.sA.loadPoly();
    this.counterText = createP("0");
    this.counterText.position(100, 100);
    this.loadSnake(.1);
    //noCursor();
  }
  this.start = function() {
    this.startButton.hide();
    this.isRunning = true; 
  //  print(this.isRunning);
  }
  


  this.play = function(){
    //this.layout();
  //  this.started = true;
   //if(!this.started && !this.ended) this.menu();
   //if(this.ended == true){
   //  print("end");
   //}
   if(!this.isRunning){
     this.menu();
   } else if( this.isRunning && this.ended == false) {
   this.layout();
  
   }  else if(this.ended ===true){
     this.gameOver();
   }
   //if(this.started && this.ended) this.gameOver();
    
    /*
    if(!started && !ended) this.menu();
    if(started && !ended) this.layout();
    if(started && ended) this.gameOver();
    */
  }

   this.menu = function() {
    image(this.startS, -12, 10);
  }



 this.gameOver = function() {
   background(0, 0, 255);
   textSize(50);
   fill(255);
   text("Refresh to Restart", 375, 100);
   text("The Overall Highscore is:" + datas.score, 375, 175);
   text("Your Score was :" + this.roundNumber, 375, 250);
   datas.score = this.roundNumber;
 if(json.score > datas.score){
   text("Congratulations! You Got The New High Score" , 50, 325);
   noLoop();
 }
}

this.loadTwice = function(addV){
  for(var i = 0; i < this.sheepIn; i++){
   shorten(this.boids);
  }
  this.counts = this.counts - this.sheepIn;
  this.numBoids = this.boids.length + this.addV;

  for (var i = this.boids.length ; i < this.numBoids; i++) {
    var loc = createVector(random(width), random(height));
    //print(2);
    while(loc.x < 700 && loc.x > 300 && loc.y > 100 && loc.y < 500) {
      loc = createVector(random(width), random(height));
    }
    var vel = createVector(random(-3, 3), random(-3,3));
    var acc = createVector(0,0);
    var clr = color(20,50,200);
    boids.push(new Boid(loc, vel, acc, clr, i));
  }
  this.counts = 0;
}

this.loadSnake = function(vels) {
  this.sanke = new Preadator(this.roundNumber/10);
  for(var i = 0; i <this.snakeNum; i++ ) {
    this.snekArr.push(new Preadator(this.roundNumber/10));
  }
}
this.runSnake = function(){
  for(var i = 0; i <this.snakeNum; i++ ) {
  this.snekArr[i].update();
  this.snekArr[i].bounce();
  this.snekArr[i].render();

  }
}
//this.keyPressed = function() {
 //  saveJSON(this.stuff, 'hi.json');
//}
this.loadBoids = function() {
	this.attractor = new Mover();
	this.attractor.rad = 30;
	this.repellor = new Mover();
	this.repellor.clr = color(255,50,0);
	for (var i = 0; i < this.numBoids; i++) {
		var loc = createVector(random(width), random(height));
		while(loc.x < 700 && loc.x > 300 && loc.y > 100 && loc.y < 500) {
			loc = createVector(random(width), random(height));
		}
		var vel = createVector(random(-3, 3), random(-3,3));
		var acc = createVector(0,0);
		var clr = color(20,50,200);
		this.boids.push(new Boid(loc, vel, acc, clr, i));
	}
}

this.runBoids = function() {
	this.attractor.run();
	this.repellor.run();
	for (var i = 0; i < this.boids.length; i++) {
		this.boids[i].run(this.boids);
	}
}

//setInterval(changeAttAcc, 1000);
//setInterval(changeRepAcc, 1500);

 //this.changeAttAcc = funcion() {
//	attractor.acc = createVector(random(-.3, .3), random(-.3, .3));
//}
// this.changeRepAcc() = function {
//	repellor.acc = createVector(random(-.3, .3), random(-.3, .3));
//}
this.layout = function (){
 // print("mainScreen");
  this.player = new Player();
  image(this.bImage, -12, -10);
  this.sA.render();
  this.runBoids();
  this.runSnake();
  this.player.render();

for(var i = 0; i < this.boids.length; i++) {
  if(collideCirclePoly(this.boids[i].loc.x, this.boids[i].loc.y, 8, this.sA.poly, true)) {
  this.boids[i].isIn = true;
  this.boids[i].clr = color(255, 0, 255);
  this.index = i;
  this.counts++;
  this.saved++;
  this.sheepIn++;
  }
}

this.counts =  this.counts - this.countM;
if(this.counts === 0){
  this.ended = true;
}
if(this.numBoids === this.saved + this.countM ){
  this.roundNumber++;
  loadSnake(3 + this.roundNumber);
  loadTwice(50 + (10*this.roundNumber));
  this.countM = 0;
}
this.counterText.style("font-size", "50px");
this.counterText.style("color", "#ff0000");
this.counterText.html("Score:" + this.counts);
this.sheepIn= 0;
this.counts = 10 * this.roundNumber;
this.saved = 0;
}

}

class StartButton {
  constructor(game,x,y,width,height) {
    this.button = createButton("Start Game"); // the p5.Element which wraps a DOM element
    this.button.size(width,height);
    this.button.position(x,y);
    this.button.style("background-color", "#FF0000");
    this.button.style("border-radius", "12px");
    this.button.style("font-size", "24px");
    this.button.style("z-index", 10)
    this.button.game = game;    
    this.button.mousePressed(this.start);  
  }
  start() {  
    // Event handler for mousePressed.  'this' is the p5.Element
    this.game.start();   // use the game property to start the game
  }
  hide() { this.button.hide(); }
  show() { this.button.show(); 
          
  }
}