class ThrowableObject extends MovableObject{
    hitGround = false;
    isSplashing = false;

    IMAGES_ROTATION = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y){
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.throw();
        this.height = 70;
        this.width = 60;
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.animateRotation();
        
    }
    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(()=>{
            if (!this.hitGround){
                this.x += 10;
            }
            if (this.y >= 300 && !this.hitGround){
                this.animateSplash();
                this.hitGround = true;
            }
        }, 25);
    }

    animateRotation(){
        setInterval (() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 20);
    }

    animateSplash(){
        setInterval(()=> {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 20);
    }

    hitEndboss(){
        this.isSplashing = true;
        this.animateSplash();
    }
}