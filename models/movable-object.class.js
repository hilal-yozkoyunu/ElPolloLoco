class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    coin = 0;
    bottle = 0;

    applyGravity(){
        setInterval(()=>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true;
        } else {
            return this.y < 130;
        }
    }

/*
    isColliding(obj) {
        return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
                (this.Y + this.offsetY + this.height) >= obj.Y &&
                (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
                obj.onCollisionCourse;
    }*/
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }/*
    isColliding(mo){
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }*/
    hit(){
        this.energy -= 10;
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    collectCoins(){
        this.coin += 1;
        return this.coin;
    }
    collectBottles(){
        this.bottle += 1;
        return this.bottle;
    }
    throwBottles(){
        this.bottle -= 1;
        return this.bottle;
    }
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
    isDead(){
        return this.energy == 0;
    }
    kill() {
        this.energy = 0;
        return this.energy == 0;
    }
    getEnergy() {
        return this.energy;
    }
    moveRight(){
        this.x += this.speed;
    }
    moveLeft(){
        this.x -= this.speed;
    }
    jump(){
        this.speedY = 30;
    }
    isFalling() {
        return this.speedY < 0;
    }
    playAnimation(images){
        //walk animation
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}