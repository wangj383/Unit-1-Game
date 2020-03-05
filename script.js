


let canvas = document.querySelector("canvas");
let startButton = document.querySelector("#start")
// Set canvas frame size
canvas.width = 1000
canvas.height = 400


// **** Loading all variables ****
let c = canvas.getContext("2d")

// for "Game Over" sign
let gameOver = canvas.getContext("2d")
let gameOverX = canvas.width/2 - 100;
let gameOverY = canvas.height/2 - 50;
let gameOverWidth = 200;
let gameOverHeight = 100;

let ground_height = (canvas.height / 5 * 4 + 3 )
// let startButtonPresence = true
let stopAutoMoveAnimate = false
let mushroomGo = false
let jumpKey = "off"
let score = 0
let highestScore = 0




// Math helper function
function randomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getDistance(cx,cy,ox,oy){
  let xDistance = cx - ox;
  let yDistance = cy - oy;
  return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}




// Loading the background image
let backgroundImage = new Image(); 
backgroundImage.src = './images/forest.png'; 
backgroundImage.onload = function() {
  c.drawImage(backgroundImage, 0, 0,canvas.width, canvas.height);
  // drawGround()
}

// Event listener for mousemove and click for start button

startButton.addEventListener("click",function(){
  $("#start").fadeOut(1);
  init()
})


// Press spacebar to jump up 
window.addEventListener('keydown', function(event){
  // && startButtonPresence == false
  if (event.which == 32 && stopAutoMoveAnimate == false && jumpKey != "on"){
    jumpKey = "on"
    window.requestAnimationFrame(jumpAnimate)
  }
})


// Ground Line

// this code is for testing where my ground line is 
// function drawGround() {
//   c.beginPath();
//   c.moveTo(0, ground_height);
//   c.lineTo(canvas.width, ground_height);
//   c.strokeStyle = "white";
//   c.stroke();
// }

//circle
class Circle{
  constructor (x,y,radius,startAngle,dx,dy,color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this._y = this.y;
    this._dy = this.dy;
    // this.count = 0;
  }
  
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, this.startAngle, Math.PI * 2, false);
    c.closePath();
    c.fillStyle = this.color;
    c.fill();
  };
  
  jump(){
    if(this.y != this._y && jumpKey == "off" ){
      this.y += this.dy
      this.dy = this._dy
    }
    if (jumpKey == "on"){
      this.y += this.dy
      this.dy += 1
      if (this.y == (this._y)){
        // reset dy to original value
        this.dy = this._dy
        //  turn off jumpKey if one of the character's body part returns to its original location
          jumpKey = "off"
      }
    }
  }

  autoMoveXaxis(){
    this.x -= this.dx;
    this.draw();
  }

 
}

class Character{
  constructor(dy){
    this.dy = dy
    this.ear1 = new Circle(88, ground_height - 36, 8, 0, 0 , this.dy, "grey")
    this.body = new Circle(80, ground_height - 20, 20, 0, 0, this.dy, "white")
    this.body2 = new Circle(70, ground_height - 18, 18, 0, 0, this.dy, "white")
    this.body3 = new Circle(62, ground_height - 17, 17, 0, 0, this.dy, "white")
    this.ear2 = new Circle(79, ground_height - 35, 8, 21, 0 , this.dy, "grey")
    this.eye1 = new Circle(89, ground_height - 22, 5, 20, 0 , this.dy, "grey")
    this.eyeInner = new Circle(91, ground_height - 23, 2, 0, 0 , this.dy, "#EEEDE7")
    this.leg1 = new Circle(93, ground_height -1, 4, 0, 0 , this.dy, "grey")
    this.leg2 = new Circle(84, ground_height, 4, 0, 0 , this.dy, "grey")
    this.leg3 = new Circle(65, ground_height, 4, 0, 0 , this.dy, "grey")
    this.leg4 = new Circle(57, ground_height, 4, 0, 0 , this.dy, "grey")
  }
  draw(){
    this.ear1.draw()
    this.leg1.draw()
    this.leg3.draw()
    this.body.draw()
    this.body2.draw()
    this.body3.draw()
    this.ear2.draw()
    this.eye1.draw()
    this.eyeInner.draw()
    this.leg2.draw()
    this.leg4.draw()

  }
  jump(){
    this.ear1.jump()
    this.leg1.jump()
    this.leg3.jump()
    this.body.jump()
    this.body2.jump()
    this.body3.jump()
    this.ear2.jump()
    this.eye1.jump()
    this.eyeInner.jump()
    this.leg2.jump()
    this.leg4.jump()
    console.log("ALL PROCESSED")
  }
}


class Mushroom {
  constructor(dx){

    this.dx = dx
    this.head = new Circle(canvas.width, canvas.height / 5 * 4, 30, 10, this.dx, 0, "#ea526f")
    this.dot1 = new Circle (canvas.width + 6, canvas.height / 5 * 4 - 17, 2, 0, this.dx, 0, "white")
    this.dot2 = new Circle (canvas.width- 3, canvas.height / 5 * 4 - 24, 2, 0, this.dx, 0,"white")
    this.dot3 = new Circle (canvas.width - 12, canvas.height / 5 * 4 - 17, 2, 0, this.dx, 0, "white")
    this.dot4 = new Circle (canvas.width + 17 , canvas.height / 5 * 4 - 20, 2, 0, this.dx, 0,"white")
    this.dot5 = new Circle (canvas.width + 22 , canvas.height / 5 * 4 - 10, 2, 0, this.dx, 0,"white")
    this.x = 0

  }
  autoMoveXaxis(){
    this.x -= this.dx;
    this.draw();
    this.head.autoMoveXaxis()
    this.dot1.autoMoveXaxis()
    this.dot2.autoMoveXaxis()
    this.dot3.autoMoveXaxis()
    this.dot4.autoMoveXaxis()
    this.dot5.autoMoveXaxis()
  }

  draw(){
    // draw mushroom stem
    c.beginPath();
    c.moveTo(canvas.width - 5 + this.x, canvas.height / 5 * 4 + 4 );
    c.lineTo(canvas.width - 5 + this.x, canvas.height / 5 * 4 - 20);
    c.lineTo(canvas.width + 10 + this.x, canvas.height / 5 * 4 - 20);
    c.lineTo(canvas.width + 10 + this.x, canvas.height / 5 * 4 + 4);
    c.closePath();
    c.strokeStyle = "black";
    c.stroke();
    c.fillStyle = "#fbe3cc";
    c.fill();

    // draw the mushroom head and the dots on the head 
    this.head.draw()
    this.dot1.draw()
    this.dot2.draw()
    this.dot3.draw()
    this.dot4.draw()
    this.dot5.draw()

  }
}


// create mushroom/obstacle at random interval
function randomMushroom() {
  let interval = randomIntInclusive(9,50)*100
  setTimeout(function() {
    // mushroom = new Mushroom(randomIntInclusive(1,5))
    if (mushroomGo ==true) {
      randomMushroom()
      mushroomTroup.push(new Mushroom(4));
    }
  }, interval)
}

// Initiate the game
let char = new Character(-20)

function init() {
  backgroundImage.onload()
  char.draw()
  scoreDisplay()
  stopAutoMoveAnimate = false
  window.requestAnimationFrame(autoMoveAnimate)
  mushroomGo = true
  mushroomTroup = [new Mushroom(4)]
  randomMushroom()
}




// Reset the game
function reset(){
  stopAutoMoveAnimate = true
  c.clearRect(0,0,canvas.width,ground_height)
  backgroundImage.onload()
  $("#start").fadeIn()
  // drawGround()
  score = 0
  char = new Character(-20)
  mushroomTroup = [new Mushroom(4)]

}
buttonEl = document.querySelector(".reset")
buttonEl.addEventListener("click", reset)






// score recording
function scoreDisplay() {
  c.textAlign="center"; 
  c.textBaseline = "middle";
  c.fillStyle = "#FFF66E";
  c.font = "20px Comic Sans MS"
  c.fillText ("Highest Score: " + highestScore.toString() + "  Your score:" + score.toString(), canvas.width - 200, 60)

}











// Game Interactive Functions

function autoMoveAnimate() {
  if (stopAutoMoveAnimate == false) {
      requestAnimationFrame(autoMoveAnimate);
      c.clearRect(0,0,canvas.width, ground_height);
      backgroundImage.onload()
      score += 1
      scoreDisplay()
      char.draw()
      mushroomTroup.forEach((mushroom) => {
        mushroom.autoMoveXaxis()
        // Collision detection
        if(getDistance(char.body.x, char.body.y, mushroom.head.x, mushroom.head.y) < (char.body.radius + mushroom.head.radius)
           || getDistance(char.body2.x, char.body2.y, mushroom.head.x, mushroom.head.y) < (char.body2.radius + mushroom.head.radius)){
          stopAutoMoveAnimate = true
          mushroomGo = false
          jumpKey = "off"
          c.clearRect(0,0,canvas.width, ground_height);
          backgroundImage.onload()
          if (highestScore < score){
            highestScore = score
            }
          scoreDisplay()
          
          char.draw()
          mushroom.head.color = "orange"
          mushroom.draw()
          gameOver.textAlign="center"; 
          gameOver.textBaseline = "middle";
          gameOver.fillStyle = "orange";
          gameOver.font = "30px Comic Sans MS"
          gameOver.fillText ("Game Over", gameOverX + gameOverWidth / 2, gameOverY + gameOverHeight / 2)
        }
      })

  }
}
function jumpAnimate(){
  char.jump()
  if (jumpKey == "on") {
    requestAnimationFrame(jumpAnimate)
  } 
  
}
