class Chicken extends MovableObject{

    y = 355;
    height = 80;
    width = 70;
    isDead = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = 3000 + Math.random() * 1500;
        this.speed = 0.5 + Math.random() * 0.5;
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000/60);

        setInterval (()=>{
            if (this.isDead){
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}