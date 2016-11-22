var started;
var ended;
var game;
var datas;
var cute;
function preload() {
  datas = loadJSON("lion.json");
  cute = loadSound("cute.mp3");
}
function setup() {
  cute.play();
  game = new Game();
  game.init();
}

function draw () {
  game.play();
} 

function mousePressed() {
  print("hi");
  if(!started && !ended){
    started = true;
    ended = false;
  }
print(started);
}