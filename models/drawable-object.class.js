class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };



    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof BottlesOnGround || this instanceof Endboss || this instanceof ThrowableObject){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}