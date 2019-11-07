class Monster {
  /**
   * 
   * @param {x axis position on canvas} x 
   * @param {y axis position on canvas} y 
   */
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 3;

    const monsterImg = new Image();
    monsterImg.src = "../images/sprite-gold-armor.png";
    this.monster = monsterImg;

    // initial frame position and dimensions
    this.spriteX = 0;
    this.spriteY = 704;
    this.frameWidth = 64;
    this.frameHeight = 64;

    // this might not be necessary since they do not seem to affect the image
    this.spriteWidth = 64;
    this.spriteHeight = 64;

    const ctx = document.getElementById('canvas-img').getContext('2d');
    this.canvasCtx = ctx;
    this.canvasWidth = document.querySelector("#canvas-img").width;
    this.canvasHeight = document.querySelector("#canvas-img").height;
  }

  /**
   * move monster towards player
   * @param {player x axis position on canvas} playerX 
   * @param {player y axis position on canvas} playerY 
   */
  moveMonster(playerX, playerY) {
    if(playerX > this.x) 
      this.x += this.speed;
    if(playerX < this.x)
      this.x -= this.speed;
    if(playerY > this.y)
      this.y += this.speed;
    if(playerY < this.y)
      this.y -= this.speed;
  }

  monsterDirection(playerX, playerY) {
    if(playerX < this.x && playerY < this.y && playerY-this.y < playerX-this.x)
      return 1; // quadrant II top 
    else if(playerX >= this.x && playerY < this.y && playerY-this.y < this.x-playerX)
      return 1; // quadrant I top 
    else if(playerX < this.x && playerY >= this.y && playerY-this.y <= this.x-playerX)
      return 2; // quadrant III top
    else if(playerX < this.x && playerY < this.y && this.y-playerY <= this.x-playerX)
      return 2; // quadrant II bottom 
    else if(playerX > this.x && playerY > this.y  && playerY-this.y > playerX-this.x)
      return 3; // quadrant IV bottom
    else if(playerX <= this.x && playerY > this.y  && playerY-this.y > this.x-playerX)
      return 3; // quadrant III bottom
    else if(playerX > this.x && playerY >= this.y && playerY-this.y <= playerX-this.x)
      return 4; // quadrant IV top
    else if(playerX > this.x && playerY < this.y && playerY-this.y >= this.x-playerX)
      return 4; // quadrant I bottom
  }

  /**
   * change the direction the monster based on the position of the player
   * @param {the direction the monster is facing} monsterDirection 
   */
  changeSpriteFrame(playerDirection) {
    switch(playerDirection) {
      case 1: // up
        if (this.spriteY > 512 || this.spriteY < 512) {
          this.spriteY = 512;
          this.spriteX = 0;
        } 
        else if (this.spriteX + 64 > 512)
          this.spriteX = 64;
        else
          this.spriteX += 64;
        break;
      case 2: // left
        if (this.spriteY > 576 || this.spriteY < 576) {
          this.spriteY = 576;
          this.spriteX = 0;
        } 
        else if (this.spriteX + 64 > 512)
          this.spriteX = 64;
        else
          this.spriteX += 64;
        break;
      case 3: // down
        if (this.spriteY > 640 || this.spriteY < 640) {
          this.spriteY = 640;
          this.spriteX = 0;
        } 
        else if (this.spriteX + 64 > 512)
          this.spriteX = 64;
        else
          this.spriteX += 64;
        break;
      case 4: // right
        if (this.spriteY > 704 || this.spriteY < 704) {
          this.spriteY = 704;
          this.spriteX = 0;
        } 
        if (this.spriteX + 64 > 512)
          this.spriteX = 64;
        else
          this.spriteX += 64;
        break;
    }
  }

  /**
   * draw the monster on the canvas
   */
  drawMonster = () => {
    this.canvasCtx.drawImage(this.monster, this.spriteX, this.spriteY, this.frameWidth, this.frameHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
  }
}