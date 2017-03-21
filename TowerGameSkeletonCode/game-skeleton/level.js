'use strict'

// The Level class contains most of the assets.
class Level {
    constructor(game, number, currentTower) {
        this.game = game;
        this.number = number;
        this.init();
        this.towers = [];
        this.canPlaceTower = false;
    }

    init() {    // needs to be called each time a level is re-started
                // different level numbers should have different behavior
        this.predator = new Predator(this);
        this.tower = new Tower(this);
        this.safeArea = new SafeArea(this);

        this.numBoids = 100;
        this.boids = [];
        for(let i = 0; i < this.numBoids; i++)
          this.boids.push(new Boid(this));
          this.game.canvas.addEventListener('mousedown', function() {
            if(game.currentTower != 5){      //  towers.push(new towerClasses["tower"](canvas.x, canvas.y));
              game.levels[0].towers.push(new towerClasses[0](canvas.x,canvas.y, game.currentTower)); //currentTower));
              game.currentTower = 5;
            }
            }, false);
    }

    drawMouse() {
     var img = new Image();
     game.context.save();
     var range = 15;
     if(game.currentTower > 4){

     } else{
      img.src = ("images/t" + game.currentTower + ".png" );
       game.context.beginPath();
       game.context.setTransform(1, 0, 0, 1, 0, 0);
       game.context.translate(canvas.x-25, canvas.y-25);
       game.context.drawImage(img, 0, 0);
       game.context.restore();
     }


  }


    run() {
        this.render();

        for(var i = 0, j = this.towers.length; i < j; i++ ){
          this.towers[i].drawTower();
        }
        for(var i = 0, j = this.towers.length; i < j; i++ ) {;
          this.towers[i].findUnitVector();
          this.towers[i].fire();
        }



        for(var i = 0, j = bullets.length; i < j; i++) {
          bullets[i].draw();
        }

        for(var i = 0, j = bullets.length; i < j; i++) {
          bullets[i].move();
          if(bullets[i].checkCollision()) {
            bullets.splice(i,1);
            j--;
            i--;
          }
        }

        this.drawMouse();
        this.predator.run();
        this.safeArea.run();
        this.runBoids();
    }

    runBoids() {    // give every boid some time
        for(let i = 0; i < this.numBoids; i++){
            this.boids[i].run();
          }
        }


    render() {
        // draw whatever
        // here is some place holder
      var context = this.game.context;
      context.save();
      // draw a gray background
      context.fillStyle = "gray";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        // draw the level text
      var levelText = ["Zero", "One", "Two","Three"];
      context.fillStyle = "white";
      context.font = "48px sans-serif";
  //    context.fillText("Level " + levelText[this.number], 250,300);
      context.restore();

    }

}
