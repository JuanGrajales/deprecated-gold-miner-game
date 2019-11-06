class Game {
  /**
   * 
   * @param {*} canvasWidth 
   * @param {*} canvasHeight 
   */
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.playerArr = [];
    this.thePlayer = new Player(10,10);
    this.monsterArr = [];
    this.theMonster = new Monster(canvasWidth/7, canvasHeight/7, 60, 100);

    const ctx = document.getElementById('canvas-img').getContext('2d');
      this.canvasCtx = ctx;
  }

  /**
   * detect if the player has collided with the monster or monies
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY 
   */
  collisionDetection(futureX, futureY) {
    let canMove = true;

    // the greater these values are the closer the player will be able to get to the object before it cannot move
    let rightProximity = 10;
    let leftProximity = 11;
    let topProximity = 25;
    let bottomProximity = 30;

    let playerRightSide = futureX + this.thePlayer.width - rightCollissionProximity;
    let playerLeftSide = futureX  + leftCollissionProximity;
    let playerTopSide = futureY + topCollissionProximity;
    let playerBottomSide = futureY + this.thePlayer.height - bottomCollissionProximity;

    let monsterRightSide = this.theMonster.x + this.theMonster.width;
    let monsterLeftSide = this.theMonster.x;
    let monsterTopSide = this.theMonster.y;
    let monsterBottomSide = this.theMonster.y + this.theMonster.height;

    
    let monsterRightSide2 = this.theMonster2.x + this.theMonster2.width;
    let monsterLeftSide2 = this.theMonster2.x;
    let monsterTopSide2 = this.theMonster2.y;
    let monsterBottomSide2 = this.theMonster2.y + this.theMonster2.height;


    /**
     * if the right and left side of the player are between then monsters left and right side &&
     * if the top and bottom side of the player are between then monsters top and bottom side
     */
    if(futureX + this.thePlayer.frameWidth - rightProximity >= monsterLeftSide && playerLeftSide <= monsterRightSide && 
      playerBottomSide >= monsterTopSide && playerTopSide <= monsterBottomSide) {
      canMove = false;
      this.theSound.playDamageSound();
    }
}