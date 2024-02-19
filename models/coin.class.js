class Coin extends MovableObject{
    height = 100;
    width = 100;
    IMAGES = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];
    offset = {
        top: 55,
        left: 50,
        right: 50,
        bottom: 55
    };

    constructor(x, y){
        super().loadImage('../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }
    animate(){
        setInterval (() => {
            this.playAnimation(this.IMAGES);
        }, 500);
    }
}
