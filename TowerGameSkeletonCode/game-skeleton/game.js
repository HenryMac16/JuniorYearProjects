'use strict'

// wait for the window to load and than call back setup()


window.addEventListener('load', setup, false);

var game;

 // the global game object
const FRAME_RATE=30;

//var
function setup() {
  var headerDiv = document.createElement("headerDiv");
  headerDiv.setAttribute('id', 'headerDiv');
  headerDiv.style.height = "100px";
  headerDiv.style.width = "1100px";
  headerDiv.style.background = "blue";
  headerDiv.style.color = "white";
  headerDiv.style.display = "block";
  headerDiv.style.margin = "auto";
  document.getElementById("wrapperDiv").appendChild(headerDiv);

// -----------------------------------------------------------------------

 var canvas = document.getElementById("canvas");
 canvas.setAttribute('id', 'canvas');
// canvas.style.height = "700px";
 //canvas.style.width = "1000px";
 //canvas.style.background = "green";
 canvas.style.color = "white";
// canvas.style.display = "block";
//canvas.style.float = "left";
 //midDiv.style.verticalAlign="middle";
 canvas.style.margin = "auto";
 //midDiv.style.verticalAlign="middle";
//  canvas.style.margin = "auto";
 document.getElementById("wrapperDiv").appendChild(canvas);

// -----------------------------------------------------------------------
 var footDiv = document.createElement("footDiv");
 footDiv.setAttribute('id', 'footDiv');
   footDiv.style.height = "700px";
   footDiv.style.width = "100px";
   footDiv.style.background = "red";
   footDiv.style.color = "white";
  // footDiv.style.display = "block";
   footDiv.style.float = "right";
   //footDiv.style.margin = "auto";
 document.getElementById("wrapperDiv").appendChild(footDiv);

// -----------------------------------------------------------------------

// wait 100ms for resources to load then start draw loo

  game = new Game();
  window.setTimeout(draw, 100);
  for(var i = 0; i < 8; i++){
    game.createButton(game.idName[i], "headerDiv", 9);
  }
  for(var i = 0; i < 5; i++){
    game.createButtonTwo(game.lowerT[i], i);
  }

}

function draw() {   // the animation loop
    game.run();
    window.setTimeout(draw, 1000/FRAME_RATE);    //console.log("running");  // come back here every interval
}


// Game is the top level object and it contains the levels
class Game {

  constructor() {
    this.currentTower = 5;
    this.towers = [];
    this.idName = ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8"];
    this.lowerT = ["low1", "low2", "low3", "low4", "low5"];  // from setup()
    this.isRunning = true;
    this.canvas =  document.getElementById('canvas');

  	if (!this.canvas || !this.canvas.getContext)
        throw "No valid canvas found!";
    this.context = this.canvas.getContext("2d");
    if(!this.context)
        throw "No valid context found!";
    this.levels = [];
    this.numLevels = 2;     // for now
    this.currentLevel = 1;
    for(let i = 0; i < this.numLevels; i++)
        this.levels.push(new Level(this, i+1));

        this.canvas.addEventListener("mousemove", this.getPosition);



  }

  createButton(id, place, width){
  var buttonTwo = document.createElement("div");
  document.getElementById(place).appendChild(buttonTwo);
  var width = 1100/width;

  buttonTwo.style.width = "50px";
  buttonTwo.style.height = "50px";
  buttonTwo.style.marginLeft = "77.7px";
  buttonTwo.style.marginTop = "25px";
  buttonTwo.style.background = "purple";

  buttonTwo.style.float = "left";
  buttonTwo.setAttribute("id", id);
  buttonTwo.addEventListener('mouseenter', function(){
  buttonTwo.style.background = "pink";

  });
  buttonTwo.addEventListener('mouseleave', function(){
  buttonTwo.style.background = "purple";

  });
  }
   createButtonTwo(id, i){
   var button = document.createElement("div");
   document.getElementById("footDiv").appendChild(button);
     var width = 1100/width;
    var imagesPath = ("images/t" + i + ".png" );
    button.style.width = "50px";
    button.style.height = "50px";
    button.style.marginLeft = "25px";
    button.style.marginTop = "50px";
    button.style.background = "purple";
    button.style.float = "left";
    //button.style.backgroundImage = "url('t0.png')";
    button.style.backgroundImage = "url('" + imagesPath + "')";
    button.setAttribute("id", id);
    button.addEventListener('mouseenter', function(){
    button.style.background = "pink";
    button.style.backgroundImage = "url('" + imagesPath +"')";

   // button.style.backgroundImage = "url('t0.png')";

  });
//Turret Code !!!!!!
  button.addEventListener('mousedown', function(){

    game.currentTower = i;
  });
  /////////////////////////////////////
  button.addEventListener('mouseleave', function(){
    button.style.background = "purple";
    button.style.backgroundImage = "url('" + imagesPath +"')";
  });

  }


   getPosition(evt) {
     var rect = canvas.getBoundingClientRect();
      canvas.x= evt.clientX - rect.left,
      canvas.y= evt.clientY - rect.top
  }



  run() {
    //  game.drawMouse();
    if(this.isRunning) {
        this.render();
        this.levels[0].run();

    }
  } /////////////////// Game Class End




  render() {



    }

}
