// ***** Code Outline *****
// (1) Introduce Variables
// (2) Math Helper Functions
// (3) Event Listeners
// (4) Create Classes: Class Circle, Character (=Guinnie), Mushroom (=Obstacle)
// (5) Game Preparation Functions
// (6) Game Initiation Function
// (7) Game Animation Functions: autoMoveAnimation and jumpAnimation function
// (8) Reset game
// (9) Useful Function for Testing
 



// *** (1) Introduce Variables ***

// DOM elements
let canvas = document.querySelector("canvas");
let startButton = document.querySelector("#start");
let buttonEl = document.querySelector(".reset");

// Set canvas frame size
canvas.width = 1000;
canvas.height = 400;

// Initiate variable used for drawing the character and obstacles/mushrooms
let c = canvas.getContext("2d");

// Initiate variables used for the game 
let stopAutoMoveAnimate = false;
let mushroomGo = false;
let jumpKey = "off";
let ground_height = (canvas.height / 5 * 4 + 3 );
let score = 0;
let highestScore = 0;
let mushroomSpeed = 4;

// Variables for "Game Over" sign
let gameOver = canvas.getContext("2d");
let gameOverX = canvas.width/2 - 100;
let gameOverY = canvas.height/2 - 50;
let gameOverWidth = 200;
let gameOverHeight = 100;




// *** (2) Math helper functions ***

function randomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getDistance(cx,cy,ox,oy) {
  let xDistance = cx - ox;
  let yDistance = cy - oy;
  return Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}




// *** (3) Event Listeners ***

// startButton's event listener 
// (startButton is created by html, and therefore need to be fadeout to hide the displauy)
startButton.addEventListener("click", function() {
  $("#start").fadeOut(1);
  init();
})

// Spacebar's event listener ( press the key to let the character jump)
window.addEventListener('keydown', function(event) {
  if (event.which == 32 && stopAutoMoveAnimate == false && jumpKey != "on"){
    jumpKey = "on";
    window.requestAnimationFrame(jumpAnimate);
  }
})

// Event Listener for reset
buttonEl.addEventListener("click", reset);




// *** (4) Classes (Circle, Character, Mushroom) ***

// The fundamental class that Class Character and Class Mushroom inheritant from
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
  }
  
  // Draw circle
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, this.startAngle, Math.PI * 2, false);
    c.closePath();
    c.fillStyle = this.color;
    c.fill();
  };
  
  // Motion: Jump up and fall down
  jump(){
    // When the jumpKey is off, put other parts of the character back to its original location
    if(this.y != this._y && jumpKey == "off" ){
      this.y += this.dy
      this.dy = this._dy
    }
    if (jumpKey == "on"){
      this.y += this.dy
      this.dy += 1

      //  turn off jumpKey if one of the character's body part returns to its original location
      if (this.y == (this._y)){
        // reset dy to original value
        this.dy = this._dy
          jumpKey = "off"
      }
    }
  }

//Motion: Move to the left
  autoMoveXaxis(){
    this.x -= this.dx;
    this.draw();
  }
}


// Create Guinnie, Inherit from Class Circle
class Character{
  constructor(dy){
    this.dy = dy
    // Create body parts
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

  // Draw Guinnie
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

  // Guinnie Jump
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
  }
}


// Create a Mushroom, Inherit from Class Circle
class Mushroom {
  constructor(dx) {
    this.dx = dx;
    this.head = new Circle(canvas.width, canvas.height / 5 * 4, 30, 10, this.dx, 0, "#ea526f");
    this.dot1 = new Circle (canvas.width + 6, canvas.height / 5 * 4 - 17, 2, 0, this.dx, 0, "white");
    this.dot2 = new Circle (canvas.width- 3, canvas.height / 5 * 4 - 24, 2, 0, this.dx, 0,"white");
    this.dot3 = new Circle (canvas.width - 12, canvas.height / 5 * 4 - 17, 2, 0, this.dx, 0, "white");
    this.dot4 = new Circle (canvas.width + 17 , canvas.height / 5 * 4 - 20, 2, 0, this.dx, 0,"white");
    this.dot5 = new Circle (canvas.width + 22 , canvas.height / 5 * 4 - 10, 2, 0, this.dx, 0,"white");
    this.x = 0;
  }

  // Motion: Move Horizontally (to the left)
  autoMoveXaxis() {
    // Move the mushroom stem
    this.x -= this.dx;
    this.draw();
    // Move the mushroom head
    this.head.autoMoveXaxis();
    this.dot1.autoMoveXaxis();
    this.dot2.autoMoveXaxis();
    this.dot3.autoMoveXaxis();
    this.dot4.autoMoveXaxis();
    this.dot5.autoMoveXaxis();
  }

  draw() {
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
    this.head.draw();
    this.dot1.draw();
    this.dot2.draw();
    this.dot3.draw();
    this.dot4.draw();
    this.dot5.draw();
  }
}




// *** (5) Game Preparation Functions***

// score recording
function scoreDisplay() {
  c.textAlign="center"; 
  c.textBaseline = "middle";
  c.fillStyle = "#FFF66E";
  c.font = "20px Comic Sans MS"
  c.fillText ("Highest Score: " + highestScore.toString() + "  Your score:" + score.toString(), canvas.width - 200, 60)
}


// Create mushroom at random interval

// randomMushroom function is called by a setTimeout function inside this function
// randomMushroom: generate a random interval within 900 - 5000ms and increase mushroomSpeed if the player's score is above 800
// setTimeout: generate a random mushroom and push it into an array called MushroomTroup,
//             and activated at different times/intervals genrated by its parent/randomMushroom function
function randomMushroom() {
  let interval = randomIntInclusive(9,50)*100;
  // speed up mushroom
  if (score > 600) {
    mushroomSpeed += score/5000;
    if (mushroomSpeed >= 4.5){
      interval = randomIntInclusive(8,30)*100
    }
    if (score > 3000){
      interval = randomIntInclusive(7,20)*100
    }
  }
  setTimeout(function() {
    if (mushroomGo == true) {
      randomMushroom();
      mushroomTroup.push(new Mushroom(mushroomSpeed));
    }
  }, interval);
}

// Create the character with a y-axis velocity (dy) = -20
let char = new Character(-20);

// Load the background image
let backgroundImage = new Image(); 
backgroundImage.src = './images/forest.png'; 
backgroundImage.onload = function() {
  c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}




// *** (6) Game Initiation function***

// Start the game 
function init() {
  backgroundImage.onload();
  char.draw();
  scoreDisplay();
  stopAutoMoveAnimate = false;
  window.requestAnimationFrame(autoMoveAnimate);
  mushroomGo = true;
  // push in the first mushroom into the mushroomTroup array first
  mushroomTroup = [new Mushroom(mushroomSpeed)];
  // Generate random mushroom
  randomMushroom();
}




// *** (7) Game Animation Functions ***
// autoMoveAnimate: continuously updating/drawing the current location of the character and mushrooms;
//                  contains a collision detection function
function autoMoveAnimate() {
  if (stopAutoMoveAnimate == false) {
      requestAnimationFrame(autoMoveAnimate);
      c.clearRect(0,0,canvas.width, ground_height);
      backgroundImage.onload();
      score += 1;
      scoreDisplay();
      char.draw();
      mushroomTroup.forEach((mushroom) => {
        mushroom.autoMoveXaxis();
        // Collision detection: detect whether the white color body parts of Guinnie touch the mushroom head
        if(getDistance(char.body.x, char.body.y, mushroom.head.x, mushroom.head.y) < (char.body.radius + mushroom.head.radius)
           || getDistance(char.body2.x, char.body2.y, mushroom.head.x, mushroom.head.y) < (char.body2.radius + mushroom.head.radius)){
          stopAutoMoveAnimate = true;
          mushroomGo = false;
          jumpKey = "off";
          c.clearRect(0,0,canvas.width, ground_height);
          backgroundImage.onload();
          // Check whether the score for this round is higher than the previous scores. If so, update the highest score
          if (highestScore < score){
            highestScore = score;
            }
          // Draw the ending updates (include change of scoreDisplay, mushroom head color and Display "Gane Over" phrase)
          scoreDisplay();
          char.draw()
          mushroom.head.color = "orange";
          mushroom.draw();
          gameOver.textAlign="center"; 
          gameOver.textBaseline = "middle";
          gameOver.fillStyle = "orange";
          gameOver.font = "30px Comic Sans MS";
          gameOver.fillText ("Game Over", gameOverX + gameOverWidth / 2, gameOverY + gameOverHeight / 2);
        }
      })
  }
}

// Animation: jumpAnimate function is repeatedly called by its inner function (requestAnimationFrame)
function jumpAnimate(){
  char.jump();
  if (jumpKey == "on") {
    requestAnimationFrame(jumpAnimate);
  } 
}




// *** (8) Reset the game ***
function reset(){
  stopAutoMoveAnimate = true;
  c.clearRect(0,0,canvas.width,ground_height);
  backgroundImage.onload();
  $("#start").fadeIn();
  score = 0;
  mushroomSpeed = 4;
  char = new Character(-20);
  mushroomTroup = [new Mushroom(mushroomSpeed)];
}




// *** (9) Other Useful Function for Testing ***
// Uncomment below function to draw a ground line. It is useful when testing character's jump
// function drawGround() {
//   c.beginPath();
//   c.moveTo(0, ground_height);
//   c.lineTo(canvas.width, ground_height);
//   c.strokeStyle = "white";
//   c.stroke();
// }