class StatusBarBottle extends DrawableObject {
  IMAGES = [
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
  ];
  percentage;
  amountBottles = 0;



  constructor(){
    super();
    this.loadImages(this.IMAGES);
    this.x = 30;
    this.y = 45;
    this.width = 120;
    this.height = 40;
    //this.setPercentage(0);
    this.setAmountBottles(0);
  }

      /**
     * Sets the amount of bottles in the status bar and updates the displayed image.
     * @param {number} amountBottles - The new amount of bottles.
     */
      setAmountBottles(amountBottles) {
        this.amountBottles = amountBottles;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Collects a bottle, incrementing the bottle count.
     */
    collectBottle() {
        this.amountBottles += 1;
    }
  /*setPercentage(percentage){
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }*/
  resolveImageIndex(){
    if(this.amountBottles > 21){
        return 5;
    } else if (this.amountBottles > 15){
        return 4;
    } else if (this.amountBottles > 12){
        return 3;
    } else if (this.amountBottles > 9){
        return 2;
    } else if (this.amountBottles > 6){
        return 1;
    } else {
        return 0;
    }
  }
}