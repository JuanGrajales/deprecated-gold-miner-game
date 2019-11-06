class Monster {
  /**
   * 
   * @param {x axis position on canvas} x 
   * @param {y axis position on canvas} y 
   */
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.speed = 10;

    const monsterImg = new Image();
    monsterImg.src = "../images/sprite-monster1.png";
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
   * move monster to new position
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY 
   */
  moveMonster(futureX, futureY) {
    if(this.withinBoundary(futureX, futureY)) {
        this.x = futureX;
        this.y = futureY;
    }
}

/**
 * check that the new position of the monster is within the canvas boundaries
 * @param {new x axis position on canvas} futureX 
 * @param {new y axis position on canvas} futureY 
 */
withinBoundary(futureX, futureY) {
  if(futureX + this.width <= this.canvasWidth && futureX >= 0 && 
    futureY + this.height <= this.canvasHeight && futureY >= 0)
    return true;
  else
    return false;
}
}