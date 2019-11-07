class Money {
  /**
   * constructor for Player object
   * @param {x axis position on canvas} x 
   * @param {y axis position on canvas} y 
   */
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 64;
    this.moneyType = 1; 

    const moneyImg = new Image();
    moneyImg.src = "../images/sprite-monster1.png";
    this.moneyType = moneyImg;

    // this might not be necessary since they do not seem to affect the image
    this.spriteWidth = 64;
    this.spriteHeight = 64;

    const ctx = document.getElementById('canvas-img').getContext('2d');
    this.canvasCtx = ctx;
    this.canvasWidth = document.querySelector("#canvas-img").width;
    this.canvasHeight = document.querySelector("#canvas-img").height;
  }
}