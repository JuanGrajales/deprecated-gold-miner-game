// create the canvas that you will be working, assign it to ctx
const ctx = document.getElementById('canvas-img').getContext('2d');
// variables that hold the canvas width and height in case the canvas size changes
let canvasWidth = document.querySelector("#canvas-img").width;
let canvasHeight = document.querySelector("#canvas-img").height;

// create a Game object
let game1 = new Game();
let player = game1.thePlayer;
let monster = game1.theMonster;

// frame counter
let frames = 0;
// monster frame change speed
let frameSpeed = 15;

/**
 * mainLoop recursively calls itself
 */
function mainLoop() {
  if(!game1.pause) {
    frames++;
    game1.startTimer();
  
    // clearRect erases the pixels of the canvas starting from (0, 0) until (canvasWidth, canvasHeight)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    game1.theSound.playBackground();
    player.drawPlayer();
    game1.drawMoney();
    game1.drawObstacle();
  
    // move the monster position before drawing
    if(frames % frameSpeed === 0) {
      monster.moveMonster(player.x, player.y);  
      monster.changeSpriteFrame(monster.monsterDirection(player.x, player.y));
    }
    monster.drawMonster();
  
  }
  // recursively call mainLoop with proper browser frame speed
  window.requestAnimationFrame(mainLoop);
} 

/****** Functions *****/

function smovePlayer() {
  game1.movePlayer();
}

function splayPauseGame() {
  game1.playPauseGame();
}

function startGame() {
  $("#character-select").modal();
  mainLoop();
  game1.setGoal();
  smovePlayer();
}

startGame();
