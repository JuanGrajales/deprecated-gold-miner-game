class Player {
  /**
   * constructor for Player object
   */
  constructor() {
    this.x = 50;
    this.y = 50;
    this.speed = 8;
    this.health = 100;

    const characterImg = new Image();
    characterImg.src = "../images/sprite-monster1.png";
    this.character = characterImg;

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
   * check that the new position of the player is within the canvas boundaries
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY 
   */
  withinBoundary(futureX, futureY) {
    if(futureX + this.frameWidth - 20 <= this.canvasWidth && futureX >= -20 && 
      futureY + this.frameHeight <= this.canvasHeight && futureY >= 0)
      return true;
    else
      return false;
  }

  /**
   * move player to new position
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY 
   */
  changePlayerPosition(futureX, futureY) {
    if(this.withinBoundary(futureX, futureY)) {
        this.x = futureX;
        this.y = futureY;
    }
  }

  /**
   * change the direction the character is facing by changing the sprite frame
   * @param {the direction the character is facing} characterDirection 
   */
  changeSpriteFrame(characterDirection) {
    switch(characterDirection) {
      case "ArrowUp":
        if (this.spriteY > 512 || this.spriteY < 512) {
          this.spriteY = 512;
          this.spriteX = 0;
        } 
        else if (this.spriteX + 64 > 512)
          this.spriteX = 64;
        else
          this.spriteX += 64;
        break;
      case "ArrowLeft":
        if (this.spriteY > 576 || this.spriteY < 576) {
          this.spriteY = 576;
          this.spriteX = 0;
        } 
        else if (this.spriteX + 64 > 512)
          this.spriteX = 64;
        else
          this.spriteX += 64;
        break;
      case "ArrowDown":
        if (this.spriteY > 640 || this.spriteY < 640) {
          this.spriteY = 640;
          this.spriteX = 0;
        } 
        else if (this.spriteX + 64 > 512)
          this.spriteX = 64;
        else
          this.spriteX += 64;
        break;
      case "ArrowRight":
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

  movePlayer(futureX, futureY, characterDirection) {
    this.changePlayerPosition(futureX, futureY);  
    this.changeSpriteFrame(characterDirection);
  }

  /**
   * draw the player on the canvas
   */
  drawPlayer = () => {
    this.canvasCtx.drawImage(this.character, this.spriteX, this.spriteY, this.frameWidth, this.frameHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
  }
}
