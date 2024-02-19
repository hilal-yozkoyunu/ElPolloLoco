class BottlesOnGround extends MovableObject {
    height = 80;
    width = 80;
    y = 350;
    IMAGES = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    offset = {
        top: 10,
        left: 25,
        right: 25,
        bottom: 10
    };

    constructor(x){
        super().loadImage('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.animate();
    }
    animate(){
        setInterval (() => {
            this.playAnimation(this.IMAGES);
        }, 1000);
    }
}