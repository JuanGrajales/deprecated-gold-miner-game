class Game {
  /**
   * game class constructor
   */
  constructor() {
    this.thePlayer = new Player();
    this.theMonster = new Monster();
    this.theMonster2 = new Monster();
    this.playerArr = [];
    this.monsterArr = [];
    this.moneyArr = [];
    this.obstacleArr = [];
    this.level = 1;
    this.pause = true;
    this.scoreyByLevel = []
    this.currentScore= 0;
    this.timer = 300;

    this.luckyCharmFlag = false;
    this.goal = 0;
    // this.tracker = 0; // whats the difference between this
    // this.trackerByLevel = {}; // this
    // this.scoreByLevel = 0; // and this
    this.concealArray = [];
    this.playerSelected = 1;
    this.playerImage;
    // this.createBackground(); drawBackground(); drawDirt()
    this.dirtArray = [];

    this.theSound = new Sound('../music/background-1.mp3','../music/super mario bros coin sound FX.mp3','../music/ouch.mov');
    this.theSound1 = new Sound('../music/winning-sound-fx.mov','../music/super mario bros coin sound FX.mp3',"../music/ouch.mov");
    
    const ctx = document.getElementById('canvas-img').getContext('2d');
    this.canvasCtx = ctx;
    this.width = document.querySelector("#canvas-img").width;
    this.height = document.querySelector("#canvas-img").height;
    
    this.createMoney(); // do not move, this call requires previous initilized values
    this.createObstacle();
  }

  /**
   * determine minimum number of money objects based on the level
   * @param {current game level} level 
   */
  minMoneySpawn(level) {
    // this.trackerByLevel[this.level] = 0; not sure what this is for
    if(level === 1)
      return Math.floor(Math.random() * 20) + 12;
    else if(level === 2) 
      return Math.floor(Math.random() * 40) + 12;
    else if(level === 3) 
      return Math.floor(Math.random() * 60) + 12;
  }

  /**
   * create a random amount of money objects into moneyArr
   */
  createMoney() {
    let numOfMonies = this.minMoneySpawn(this.level);
    let moneyX = 0;
    let moneyY = 0;
    let moneyWidth = 10;
    let moneyHeight = 20;
    let moneyType = 0;

    for (let i = 0; i < numOfMonies; i++) {
      // randomize spawn position
      moneyX = Math.floor(Math.random() * (this.width - moneyWidth));
      moneyY = Math.floor(Math.random() * (this.height - moneyHeight));
      moneyType = Math.floor(Math.random() * 5) + 1;

      // prevent money from spawning on top of player
      if(moneyX <= this.thePlayer.width)
        moneyX += this.thePlayer.width;
      if(moneyX <= this.thePlayer.height)
        moneyY += this.thePlayer.height;

      // add money object to array, assign value to object, draw money to canvas
      this.moneyArr.push({i : new Money(moneyX, moneyY, moneyWidth, moneyHeight, moneyType)});
      this.moneyArr[i].i.moneyValue = this.moneyArr[i].i.assignMoneyValue(this.moneyArr[i].i.moneyType)    
    }
  }
  
  /**
   * draw the all money objects in the moneyArr on canvas
   */
  drawMoney() {
    for(let i = 0; i < this.moneyArr.length; i++) {
      this.canvasCtx.drawImage(this.moneyArr[i].i.assignMoneyType(this.moneyArr[i].i.moneyType), this.moneyArr[i].i.x, this.moneyArr[i].i.y, this.moneyArr[i].i.width, this.moneyArr[i].i.height)
    }
  }

  /**
   * determine minimum number of obstacle objects based on the level
   * @param {current game level} level 
   */
  minObstacleSpawn(level) {
    if(level === 1)
      return Math.floor(Math.random() * 3) + 15;
    else if(level === 2)
      return Math.floor(Math.random() * 5) + 15;
    else if(level === 3)
      return Math.floor(Math.random() * 8) + 15;
  }

  /**
   * create a random amount of obstacle objects into obstacleArr
   */
  createObstacle() {
    // randomly creates number of money
    let numOfObstacles = this.minObstacleSpawn(this.level);
    let obstacleX;
    let obstacleY;
    let obstacleWidth = 60;
    let obstacleHeight = 80;
    let obstacleType = 0;
    
    for (let i = 0; i < numOfObstacles; i++) {
      obstacleX = Math.floor(Math.random() * (this.width - obstacleWidth));
      obstacleY = Math.floor(Math.random() * (this.height - obstacleHeight));
      obstacleType = Math.floor(Math.random() * 2) + 1;
      
      if(obstacleX <= this.thePlayer.frameWidth)
      obstacleX += this.thePlayer.frameWidth;
      if(obstacleX <= this.thePlayer.frameHeight)
      obstacleY += this.thePlayer.frameHeight;
      
      this.obstacleArr.push({i : new Obstacle(obstacleX, obstacleY, obstacleWidth, obstacleHeight, obstacleType)});
    }
  }
  
  /**
   * draw the all obstacle objects in the obstacleArr on canvas
   */
  drawObstacle() {
    for(let i = 0; i< this.obstacleArr.length; i++) {
      this.canvasCtx.drawImage(this.obstacleArr[i].i.assignObstacleType(this.obstacleArr[i].i.obstacleType), this.obstacleArr[i].i.x, this.obstacleArr[i].i.y, this.obstacleArr[i].i.width, this.obstacleArr[i].i.height);
    }
  }
  
  /**
   * detect if the player has collided with monster
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY 
   */
  monsterCollision(futureX, futureY) {
    let canMove = true;

    // the greater these values are the closer the player will be able to get to the object before it cannot move
    let rightProximity = 10;
    let leftProximity = 11;
    let topProximity = 25;
    let bottomProximity = 30;
    
    let playerRightSide = futureX + this.thePlayer.frameWidth - rightProximity;
    let playerLeftSide = futureX  + leftProximity;
    let playerTopSide = futureY + topProximity;
    let playerBottomSide = futureY + this.thePlayer.frameHeight - bottomProximity;
    
    let monsterRightSide = this.theMonster.x + this.theMonster.frameWidth;
    let monsterLeftSide = this.theMonster.x;
    let monsterTopSide = this.theMonster.y;
    let monsterBottomSide = this.theMonster.y + this.theMonster.frameHeight;
    
    /**
     * if the right and left side of the player are between then monsters left and right side &&
     * if the top and bottom side of the player are between then monsters top and bottom side
     */
    if(playerRightSide >= monsterLeftSide && playerLeftSide <= monsterRightSide && 
      playerBottomSide >= monsterTopSide && playerTopSide <= monsterBottomSide) {
        // canMove = false;
        this.thePlayer.health -= 10;
        document.querySelector("#canvas-board > div > div.health > span").innerText = this.thePlayer.health;
        this.theSound.playDamageSound();
      }
    return canMove;
  }
    
  /**
   * detect if the player has collided with monster2
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY 
   */
  monster2Collision(futureX, futureY) {
    // let canMove = true;   // change this to substract points or lose 
    
    // the greater these values are the closer the player will be able to get to the object before it cannot move
    let rightProximity = 10;
    let leftProximity = 11;
    let topProximity = 25;
    let bottomProximity = 30;
    
    let playerRightSide = futureX + this.thePlayer.frameWidth - rightProximity;
    let playerLeftSide = futureX  + leftProximity;
    let playerTopSide = futureY + topProximity;
    let playerBottomSide = futureY + this.thePlayer.frameHeight - bottomProximity;
    
    let monsterRightSide = this.theMonster2.x + this.theMonster2.frameWidth;
    let monsterLeftSide = this.theMonster2.x;
    let monsterTopSide = this.theMonster2.y;
    let monsterBottomSide = this.theMonster2.y + this.theMonster2.frameHeight;
    
    if(this.level === 3) {
      if(playerRightSide >= monsterLeftSide && playerLeftSide <= monsterRightSide && 
        playerBottomSide >= monsterTopSide && playerTopSide <= monsterBottomSide) {
        // canMove = false;
        
        this.theSound.playDamageSound();
      }
    }
    // return canMove;
  }

  /**
   * detect if the player has collided with money
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY 
   */
  moneyCollision(futureX, futureY) {
    let canMove = true;
    
    // the greater these values are the closer the player will be able to get to the object before it cannot move
    let rightProximity = 0;
    let leftProximity = 10;
    let topProximity = 0;
    let bottomProximity = 0;
    
    let playerRightSide = futureX + this.thePlayer.frameWidth - rightProximity;
    let playerLeftSide = futureX  + leftProximity;
    let playerTopSide = futureY + topProximity;
    let playerBottomSide = futureY + this.thePlayer.frameHeight - bottomProximity;
    
    this.moneyArr.forEach((e,index) => {
      if(playerRightSide >= e.i.x && playerLeftSide <= e.i.x + e.i.width && 
        playerBottomSide >= e.i.y && playerTopSide <= e.i.y + e.i.height) {
          this.moneyArr.splice(index, 1);
          // this.trackScore(e.i.moneyValue);
          this.currentScore += e.i.moneyValue;
          document.querySelector("#canvas-board > div > div.score > span").innerText = this.currentScore;

          
          // play money sounds according to type
          if(e.i.moneyType === 2)
            this.theSound.playDiamondSound();
          else
            this.theSound.playGrabSound();
        }
    });
  }

  /**
   * detect if the player has collided with obstacles
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY 
   */
  obstacleCollision(futureX, futureY) {
    let canMove = true;
    
    // the greater these values are the closer the player will be able to get to the object before it cannot move
    let rightProximity = 15;
    let leftProximity = 15;
    let topProximity = 25;
    let bottomProximity = 30;
    
    let playerRightSide = futureX + this.thePlayer.frameWidth - rightProximity;
    let playerLeftSide = futureX  + leftProximity;
    let playerTopSide = futureY + topProximity;
    let playerBottomSide = futureY + this.thePlayer.frameHeight - bottomProximity;
    
    this.obstacleArr.forEach((e,index) => {
      if(playerRightSide >= e.i.x && playerLeftSide <= e.i.x + e.i.width && 
        playerBottomSide >= e.i.y && playerTopSide <= e.i.y + e.i.height) {
          // this.obstacleArr.splice(index, 1);
          canMove = false;
          // this.trackScore(e.i.getObstacleValue(e.i.obstacleType, this.luckyCharmFlag));
          // if(e.i.obstacleType === 1){
          //   this.theSound.playCrashingSound();
          //   if(this.luckyCharmFlag === true){
          //     this.theSound.stopObstaclesSound();
          //   }
          // }else{
          //   this.theSound.playFallingSound();
          //   if(this.luckyCharmFlag === true){
          //     this.theSound.stopObstaclesSound();
          //   }
          // }
        }
    });
    return canMove;
  }

  /**
   * player collision for all game objects
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY  
   */
  playerCollision(futureX, futureY) {
    this.monster2Collision(futureX, futureY);
    this.moneyCollision(futureX, futureY);
    if(this.monsterCollision(futureX, futureY) && this.obstacleCollision(futureX, futureY))
      return true;
    else
      return false; 
  }

  /**
   * set the goal on canvas 
   * @param {current game level} level 
   */
  setGoal() {
    if(this.level === 1)
      document.querySelector("#canvas-board > div > div.goal > span").innerText = 500;
    else if(this.level === 2)
      document.querySelector("#canvas-board > div > div.goal > span").innerText = 1800;
    else if(this.level === 3)
      document.querySelector("#canvas-board > div > div.goal > span").innerText = 4000;
    this.goal = document.querySelector("#canvas-board > div > div.goal > span").innerText;
  }

  playPauseGame() {
    let playPause = document.querySelector("#canvas-board > button").innerText;
    if(playPause === "Play")
      document.querySelector("#canvas-board > button").innerText = "Pause"
    else
      document.querySelector("#canvas-board > button").innerText = "Play"
    $("#character-select").modal('hide');
    game1.pause = !game1.pause;
  }

  startTimer() {
    this.timer--;
    // set the time to the initial time
    document.querySelector("#canvas-board > div > div.timer > span").innerText = this.timer;
    if (this.timer < 200) { // when the time is running out set time font to red
      document.querySelector("#canvas-board > div > div.timer > span").setAttribute('style', 'color: rgba(180, 34, 8, 0.877)')
      this.theSound.stopBackground();
      this.theSound.playTimerSound();
      if (this.timer === 0) {
        this.theSound.stopTimer();
        this.openModal();
        if(this.level === 3 && Number(document.querySelector("#canvas-board > div > div.score > span").innerText) >= Number(document.querySelector("#canvas-board > div > div.goal > span").innerText)) {
          setInterval(()=>{
            this.theSound.stopBackground(); 
          },1)
          this.theSound.playWinningSound();
        }
      }
    } 
    else {
      document.getElementsByClassName('timer-value')[0].removeAttribute('style', 'color: rgba(180, 34, 8, 0.877)');
    }
  }

  openModal() {
    $("#character-select").modal('show');
  }

  nextLevelModal() {
  
  }

  movePlayer() {
    document.onkeydown = function (e) {
      switch(e.key) {
        case "ArrowUp":
          if(game1.playerCollision(player.x, player.y - player.speed))
            player.movePlayer(player.x, player.y - player.speed, e.key); 
          break;
        case "ArrowDown":
          if(game1.playerCollision(player.x, player.y + player.speed))
            player.movePlayer(player.x, player.y + player.speed, e.key);     
          break;
        case "ArrowLeft":
          if(game1.playerCollision(player.x - player.speed, player.y))
            player.movePlayer(player.x - player.speed, player.y, e.key);    
          break;
        case "ArrowRight":
          if(game1.playerCollision(player.x + player.speed, player.y))
            player.movePlayer(player.x + player.speed, player.y, e.key);     
          break;
      }
    }
  }

  // // track the score and keeps adding it to the score element in the score-board
  // trackScore(points) {
  //   this.scoreByLevel = points;
  //   this.tracker += valueScored;
  //   this.trackerByLevel[this.level] =+ this.scoreByLevel; 
  //   // document.getElementsByClassName('score-value')[0].innerText = this.tracker; remove comment once you add html
  // }

  fogCollision(futureX, futureY) {
    // the greater these values are the closer the player will be able to get to the object before it cannot move
    let rightProximity = 0;
    let leftProximity = 10;
    let topProximity = 0;
    let bottomProximity = 0;
    
    let playerRightSide = futureX + this.thePlayer.frameWidth - rightProximity;
    let playerLeftSide = futureX  + leftProximity;
    let playerTopSide = futureY + topProximity;
    let playerBottomSide = futureY + this.thePlayer.frameHeight - bottomProximity;

    // this.concealArray.forEach((e,index) => {
    //   if(playerRightSide >= e.x && playerLeftSide <= e.x + e.width && 
    //     playerBottomSide >= e.y && playerTopSide <= e.y + e.height) {
    //       e.x = -100;
    //       e.y = -100;
    //     }
    // })
  }

  createBackground() {
    
  }
  
  drawBackground() {
    
  }
  
  drawDirt() {

  }

  // reset the game
  reset() {
    location.reload();
  }
}