class StatusBarCoin extends DrawableObject {
  IMAGES = [
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];
  percentage;
  amountCoins = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 30;
    this.y = 80;
    this.width = 120;
    this.height = 40;
    this.setPercentage(0);
  }

  setPercentage(amountCoins) {
    this.amountCoins = amountCoins;
    let imagePath = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  collectCoins() {
    this.amountCoins += 1;
  }

  resolveImageIndex() {
    if (this.amountCoins > 10) {
      return 5;
    } else if (this.amountCoins > 8) {
      return 4;
    } else if (this.amountCoins > 6) {
      return 3;
    } else if (this.amountCoins > 4) {
      return 2;
    } else if (this.amountCoins > 2) {
      return 1;
    } else {
      return 0;
    }
  }
}
