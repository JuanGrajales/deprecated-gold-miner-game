class Money {

  /**
   * 
   * @param {x position on canvas} x 
   * @param {y position on canvas} y 
   * @param {money width} width 
   * @param {money height} height 
   * @param {money type} moneyType 
   */
  constructor(x, y, width, height, moneyType){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.moneyType = moneyType;
    this.moneyValue = 0;
  }

  /**
   * assigns the money type to the money object
   * @param {money type} moneyType 
   */
  assignMoneyType(moneyType) {
    if(moneyType === 1) {
        const goldImg = new Image();
        goldImg.src = "../images/gold-nugget.png";
        return goldImg;
    }
    else if(moneyType === 2) {
        const diamondImg = new Image();
        diamondImg.src = "../images/diamond.png";
        return diamondImg;
    }
    else if(moneyType === 3) {
        const rubyImg = new Image();
        rubyImg.src = "../images/ruby.png";
        return rubyImg;
    }
    else if(moneyType === 4) {
        const sapphireImg = new Image();
        sapphireImg.src = "../images/saphire.png";
        return sapphireImg;
    }
    else if(moneyType === 5) {
        const bagOfCoinsImg = new Image();
        bagOfCoinsImg.src = "../images/clip-bag.png";
        return bagOfCoinsImg;
    }
  }

  /**
   * assigns money object value
   * @param {money type} moneyType 
   */
  assignMoneyValue(moneyType) {
    if(moneyType === 1)
      return 30; 
    else if(moneyType === 2 || moneyType === 3 || moneyType === 4) 
      return 50;
    else if(moneyType === 5) 
      return 100;
  }
}