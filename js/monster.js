class Monster {
  /**
   * 
   * @param {x axis position on canvas} x 
   * @param {y axis position on canvas} y 
   * @param {width of player} width 
   * @param {height of player} height 
   */
  constructor(x,y,width,height){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      const monsterImg = new Image();
      monsterImg.src = "../images/enemy-snake.png";
      this.monster = monsterImg;

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