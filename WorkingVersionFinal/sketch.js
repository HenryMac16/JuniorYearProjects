
  var numBoids = 50;
  var boids = [];
  var randomPoly = []
  var hit = false;
 var  poly = [];
  var player;
  var sanke;
  var sheep;
  var index = 0;
  var shep;
  var counts = 10;
  var countM = 0;
  var saved = 0;
  var bImage;
  var counterText;
  var pen;
  var started;
  var ended;
  var sheepIn = 0;
  var addBoids = 50;
  var startS;
  var roundNumber= 1;
  var passSheep = 0;
  var snekArr = [];
  var snakeNum = 1;
  var wolfI;
  var sA;
  var datas;
  var cute;
  var over;
  json = {};
function preload() {
  datas = loadJSON("lion.json");
  cute = loadSound("cute.mp3");
  
}
function setup(){
  print(datas.score);
  cute.play();
    sA = new SafeArea();
    started = false;
    ended = false;
    frameRate(600);
    over = loadImage("gameover.png");
    wolfI = loadImage("wolf.png");
    startS = loadImage("start.png");
    pen = loadImage("pen (1).png");
    bImage = loadImage("grass2.png");
    sheep = loadImage("sheeps.png");
    shep = loadImage("shep.png");
	  var cnv = createCanvas(1100, 900);
	  var x = (windowWidth - width) / 2;
	  var y = (windowHeight - height) / 2;
	  cnv.position(x, y);
	  stroke(200, 200, 0);
	  fill(200, 200, 0);
	  Boid.prototype = new Mover();
	  loadBoids();
	  sA.loadPoly();
    counterText = createP("0");
    counterText.position(100, 100);
    loadSnake(.1);
    noCursor();
  }

  function draw(){
    if(!started && !ended) menu();
    if(started && !ended) layout();
    if(started && ended) gameOver();
  }

  function menu(){
    image(startS, -12, 10)
  }

  function mousePressed() {
  if(!started && !ended){
    started = true;
    ended = false;
  }

}

  function gameOver(){
  image(over, 0, 0);
   textSize(50);
   fill(255);
   text("Refresh to Restart", 375, 100);
   text("The Overall Highscore is:" + datas.score, 375, 175);
   text("Your Score was :" + roundNumber, 375, 250);
   json.score = roundNumber;
 if(json.score > datas.score){
   text("Congratulations! You Got The New High Score" , 50, 325);
   saveJSON(json, "lion.json");
   noLoop();
 }
}

function loadTwice(addV){
  for(var i = 0; i < sheepIn; i++){
   shorten(boids);
  }
  counts = counts - sheepIn;
  numBoids = boids.length + addV;

  for (var i = boids.length ; i < numBoids; i++) {
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
  counts = 0;
}

function loadSnake(vels) {
  sanke = new Preadator(roundNumber/10);
  for(var i = 0; i <snakeNum; i++ ) {
    snekArr.push(new Preadator(roundNumber/10));
  }
}
function runSnake(){
  for(var i = 0; i <snakeNum; i++ ) {
  snekArr[i].update();
  snekArr[i].bounce();
  snekArr[i].render();

  }
}
//this.keyPressed = function() {
 //  saveJSON(this.stuff, 'hi.json');
//}
function loadBoids() {
	attractor = new Mover();
	attractor.rad = 30;
	repellor = new Mover();
	repellor.clr = color(255,50,0);
	for (var i = 0; i < numBoids; i++) {
		var loc = createVector(random(width), random(height));
		while(loc.x < 700 && loc.x > 300 && loc.y > 100 && loc.y < 500) {
			loc = createVector(random(width), random(height));
		}
		var vel = createVector(random(-3, 3), random(-3,3));
		var acc = createVector(0,0);
		var clr = color(20,50,200);
		boids.push(new Boid(loc, vel, acc, clr, i));
	}
}

function runBoids() {
	attractor.run();
	repellor.run();
	for (var i = 0; i < boids.length; i++) {
		boids[i].run(boids);
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
function layout(){
  player = new Player();
  image(bImage, -12, -10);
  sA.render();
  runBoids();
  runSnake();
  player.render();

for(var i = 0; i < boids.length; i++) {
  if(collideCirclePoly(this.boids[i].loc.x, boids[i].loc.y, 8, poly, true)) {
  boids[i].isIn = true;
  boids[i].clr = color(255, 0, 255);
  index = i;
  counts++;
  saved++;
  sheepIn++;
  }
}

counts =  counts - countM;
if(counts === 0){
  ended = true;
}
if(numBoids === saved + countM ){
  roundNumber++;
  loadSnake(3 + roundNumber);
  loadTwice(50 + (10*roundNumber));
  countM = 0;
}
counterText.style("font-size", "50px");
counterText.style("color", "#ff0000");
counterText.html("Score:" + counts);
sheepIn= 0;
counts = 10 * roundNumber;
saved = 0;
}


