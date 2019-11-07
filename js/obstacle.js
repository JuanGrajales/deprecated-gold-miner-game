class Obstacle {
  /**
  * constructor for obstacle object
  * @param {x axis position on canvas} x 
  * @param {y axis position on canvas} y 
  * @param {width of obstacle} width 
  * @param {height of obstacle} height 
  * @param {obstacle type} obstacleType 
  */
  constructor(x,y,width,height,obstacleType){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.obstacleType = obstacleType; 
  }

  /**
   * assigns the type of obstacle the object will have
   * @param {obstacle type} obstacleType 
   */
  assignObstacleType(obstacleType) {
    if(obstacleType === 1) {
      const rockImg = new Image();
      rockImg.src = "../images/rock.png";
      return rockImg;
    }
    else if(obstacleType === 2) {
      const potholeImg = new Image();
      potholeImg.src = "../images/cactus.png";
      return potholeImg;
    }
  }

  /**
   * return the value of the obstacle
   * @param {obstacle type} obstacleType 
   * @param {power up status} luckyCharmFlag 
   */
  getObstacleValue(obstacleType, luckyCharmFlag) {
    let val;
    
    if(obstacleType === 1) {
      if(!luckyCharmFlag)
        val =- 10;
      else 
        val =+ 10;
    }
    if(obstacleType === 2) {
      if(!luckyCharmFlag)
        val =- 20;
      else
        val =+ 20;
    }
   return val;
 }
}