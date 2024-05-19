class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();
  statusBarEndboss = new StatusBarEndboss(); //-----------
  throwableObjects = [];
  coin = new Coin();
  bottle = new BottlesOnGround();
  endboss = new Endboss();
  lastBottleThrowTime = 0;

  coin_sound = new Audio('../audio/coin3.mp3');
  bottle_sound = new Audio('../audio/bottle4.mp3');
  chicken_sound = new Audio('../audio/chicken3.mp3');
  chicken_sound_small = new Audio('../audio/chicken2.mp3');
  endboss_sound = new Audio('../audio/chicken.mp3');
  throwBottle_sound = new Audio('../audio/bottle.mp3');

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }
  setWorld() {
    this.character.world = this;
  }
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollisionsBottles();
      this.checkCollisionsCoins();
      //this.refillHealth();
      this.checkBottleOnEnemy();
    }, 1000 / 60);
  } 

  /*
  refillHealth() {
    if (this.keyboard.KEY_F && this.statusBarCoin.amountCoins > 0) {
      this.statusBarCoin.amountCoins -= 1;
      this.character.energy += 5;
      this.statusBarCoin.setPercentage(this.statusBarCoin.amountCoins);
      this.statusBar.setPercentage(this.character.energy);
    }
  }*/

  checkThrowObjects() {
    if (this.keyboard.D && this.statusBarBottle.amountBottles > 0 && Date.now() - this.lastBottleThrowTime >= 200) {
        let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.statusBarBottle.amountBottles -= 1;
        this.statusBarBottle.setAmountBottles(this.statusBarBottle.amountBottles);
        this.lastBottleThrowTime = Date.now();
    }
}

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        !enemy.isDead &&
        !this.character.isHurt()
      ) {
        if (this.character.isAboveGround()) {
          this.checkJumpingOnEnemy();
        } else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
    if (this.character.isDead){
      lost();
    }
  }

  checkCollisionsBottles() {
    for (let i = this.level.bottles.length - 1; i >= 0; i--) {
      let bottle = this.level.bottles[i];
      if (this.character.isColliding(bottle)) {
        this.bottle_sound.play();
        this.statusBarBottle.collectBottle();
        this.statusBarBottle.setAmountBottles(
          this.statusBarBottle.amountBottles
        );
        this.level.bottles.splice(i, 1);
      }
    }
  }

  checkCollisionsCoins() {
    for (let i = this.level.coins.length - 1; i >= 0; i--) {
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        this.coin_sound.play();
        this.statusBarCoin.collectCoins();
        this.statusBarCoin.setPercentage(this.statusBarCoin.amountCoins);
        this.level.coins.splice(i, 1);
      }
    }
  }

  checkBottleOnEnemy() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((bottle) => {
        this.handleBottleCollision(bottle, enemy);
      });
    });
  }

  handleBottleCollision(bottle, enemy) {
    if (bottle.isColliding(enemy)) {
      if (enemy instanceof Chicken) {
        this.handleChickenCollision(bottle, enemy);
      } else if (enemy instanceof ChickenSmall) {
        this.handleChickenSmallCollision(bottle, enemy);
      } else if (enemy instanceof Endboss && !enemy.isHurt()) {
        this.handleEndbossCollision(bottle, enemy);
      }
      if (!bottle.isSplashing) {
        this.removeBottleAfterCollision(bottle);
      }
    }
  }

  handleChickenCollision(bottle, chicken) {
    chicken.isDead = true;
    this.chicken_sound.play();
    this.removeEnemyAfterDelay(chicken);
  }


  handleChickenSmallCollision(bottle, chickenSmall) {
    chickenSmall.isDead = true;
    this.chicken_sound.play();
    this.removeEnemyAfterDelay(chickenSmall);
  }


  handleEndbossCollision(bottle, endboss) {
    endboss.hit();
    this.statusBarEndboss.setPercentage(endboss.energy);
    bottle.hitEndboss();
    this.throwBottle_sound.play();
    this.endboss_sound.play();
    endboss.playAnimation(endboss.IMAGES_HURT);
  }


  removeBottleAfterCollision(bottle) {
    const bottleIndex = this.throwableObjects.indexOf(bottle);
    if (bottleIndex > -1) {
      this.throwableObjects.splice(bottleIndex, 1);
    }
  }

  //collision by jumping
  checkJumpingOnEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.character.isFalling()
      ) {
        if (enemy instanceof Chicken) {
          enemy.isDead = true;
          this.chicken_sound.play();
          this.removeEnemyAfterDelay(enemy);
        } else if (enemy instanceof ChickenSmall) {
         enemy.isDead = true;
        this.chicken_sound_small.play();
          this.removeEnemyAfterDelay(enemy);
        }
      }
    });
  }

  removeEnemyAfterDelay(enemy) {
    setTimeout(() => {
      const enemyIndex = this.level.enemies.indexOf(enemy);
      if (enemyIndex > -1) {
        this.level.enemies.splice(enemyIndex, 1);
      }
    }, 300);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0); //back
    //space for fixed objects
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.camera_x, 0); //forwards

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    //draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    if (mo instanceof BackgroundObject) {
      this.ctx.translate(this.camera_x * mo.distance, 0);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo instanceof BackgroundObject) {
      this.ctx.translate(-this.camera_x * mo.distance, 0);
    }
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
