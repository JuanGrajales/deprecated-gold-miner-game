// create the canvas that you will be working, assign it to ctx
const ctx = document.getElementById('canvas-img').getContext('2d');

// variables that hold the canvas width and height in case the canvas size changes
let canvasWidth = document.querySelector("#canvas-img").width;
let canvasHeight = document.querySelector("#canvas-img").height;

// create a Game object
let game1 = new Game(canvasWidth, canvasHeight);
let player = game1.thePlayer;
let monster = game1.theMonster;

// frame counter
let frame = 0;

// function that recursively calls itself to update the animation screen
// the loop can be called anything you want, doesn't have to be mainLoop
function mainLoop() {
  frames++;

  // clearRect erases the pixels of the canvas starting from (0, 0) until (canvasWidth, canvasHeight)
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // draw player on canvas
  player.drawPlayer()

  // recursively call mainLoop with proper browser frame speed
  window.requestAnimationFrame(mainLoop);
}

function movePlayer() {
  // depending on the key pressed the player will move in the key direction
  document.onkeydown = function (e) {
    if (e.key === "ArrowUp") {
      player.changePlayerPosition(player.x, player.y - player.speed);  
      player.changeSpriteFrame(e.key);    
    }
    if (e.key === "ArrowDown") {
      player.changePlayerPosition(player.x, player.y + player.speed);  
      player.changeSpriteFrame(e.key);    
    }
    if (e.key === "ArrowLeft") {
      player.changePlayerPosition(player.x - player.speed, player.y);  
      player.changeSpriteFrame(e.key);    
    }
    if (e.key === "ArrowRight") {
      player.changePlayerPosition(player.x + player.speed, player.y); 
      player.changeSpriteFrame(e.key);    
    }
  }
}

mainLoop();
movePlayer();

