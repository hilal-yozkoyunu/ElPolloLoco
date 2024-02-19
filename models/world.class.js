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
      this.refillHealth();
      this.checkBottleOnEnemy();
      /*
      this.checkCollisions();
      this.checkCollisionsCoin();
      this.checkCollisionsBottle();
      this.checkThrowObjects();
      this.checkJumpingOnEnemy();*/
    }, 1000 / 60);
  } /*
    checkThrowObjects(){
        if (this.keyboard.D){
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }*/
  /*
  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
    }
    this.throwableObjects.forEach((throwableObject) => {
      this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead() && throwableObject.isColliding(enemy)) {
          console.log("Enemy Hit, energy", enemy.getEnergy());
          enemy.hit();
          this.statusBarEndboss.setPercentage(enemy.getEnergy());
            //energi -5 
        } else if (enemy.isDead() && enemy.getEnergy() == 0){ /////////
            console.log("Enemy dead, energy ", enemy.getEnergy());
            enemy.kill();
            setTimeout(() => {
                let position = this.level.enemies.indexOf(enemy);
                this.level.enemies.splice(position, 1);
              }, 2000);
        }
      });
    });
  }*/

  refillHealth() {
    if (this.keyboard.KEY_F && this.statusBarCoin.amountCoins > 0) {
      this.statusBarCoin.amountCoins -= 1;
      this.character.energy += 5;
      this.statusBarCoin.setPercentage(this.statusBarCoin.amountCoins);
      this.statusBar.setPercentage(this.character.energy);
    }
  }
  /**
   * Checks if the character can throw a bottle and manages bottle throwing.
   * This method ensures that there is a cooldown between bottle throws.
   
  checkThrowObjects() {
    // Check if the "D" key is pressed, the character has bottles in inventory, and if enough time has passed since the last bottle throw
    if (
      this.keyboard.KEY_D &&
      this.statusBarBottle.amountBottles > 0 &&
      Date.now() - this.lastBottleThrowTime >= 1000
    ) {
      // Creates a new ThrowableObject at the current position of the character
      let bottle = new ThrowableObject(
        this.character.x + 10,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.statusBarBottle.amountBottles -= 1;
      this.statusBarBottle.setAmountBottles(this.statusBarBottle.amountBottles);

      // Update the timestamp of the last bottle throw
      this.lastBottleThrowTime = Date.now();
    }
  }*/
  checkThrowObjects() {
    // Check if the "D" key is pressed, the character has bottles in inventory, and if enough time has passed since the last bottle throw
    if (this.keyboard.D && this.statusBarBottle.amountBottles > 0 && Date.now() - this.lastBottleThrowTime >= 200) {
        // Creates a new ThrowableObject at the current position of the character
        let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.statusBarBottle.amountBottles -= 1;
        this.statusBarBottle.setAmountBottles(this.statusBarBottle.amountBottles);

        // Update the timestamp of the last bottle throw
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
          //this.pain_sound.play();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and bottles.
   */
  checkCollisionsBottles() {
    for (let i = this.level.bottles.length - 1; i >= 0; i--) {
      let bottle = this.level.bottles[i];
      if (this.character.isColliding(bottle)) {
        //this.collectingBottle_sound.play();
        this.statusBarBottle.collectBottle();
        this.statusBarBottle.setAmountBottles(
          this.statusBarBottle.amountBottles
        );
        this.level.bottles.splice(i, 1);
      }
    }
  }

  /**
   * Checks for collisions between the character and coins.
   */
  checkCollisionsCoins() {
    for (let i = this.level.coins.length - 1; i >= 0; i--) {
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        //this.collectingCoin_sound.play();
        this.statusBarCoin.collectCoins();
        this.statusBarCoin.setPercentage(this.statusBarCoin.amountCoins);
        this.level.coins.splice(i, 1);
      }
    }
  }

  /**
   * Checks if throwable objects hit enemies and handles the interactions.
   */
  checkBottleOnEnemy() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((bottle) => {
        this.handleBottleCollision(bottle, enemy);
      });
    });
  }

  /**
   * Handles the collision between a bottle and an enemy.
   * @param {ThrowableObject} bottle - The throwable object.
   * @param {Enemy} enemy - The enemy object.
   */
  handleBottleCollision(bottle, enemy) {
    if (bottle.isColliding(enemy)) {
      if (enemy instanceof Chicken) {
        this.handleChickenCollision(bottle, enemy);
      } else if (enemy instanceof ChickenSmall) {
        this.handleChickenSmallCollision(bottle, enemy);
      } else if (enemy instanceof Endboss && !enemy.isHurt()) {
        this.handleEndbossCollision(bottle, enemy);
      }

      // Remove the bottle once the splash animation is complete
      if (!bottle.isSplashing) {
        this.removeBottleAfterCollision(bottle);
      }
    }
  }

  /**
   * Handles the collision between a bottle and a Chicken enemy.
   * @param {ThrowableObject} bottle - The throwable object.
   * @param {Chicken} chicken - The Chicken enemy.
   */
  handleChickenCollision(bottle, chicken) {
    chicken.isDead = true;
    //this.chickenDead_sound.play();
    this.removeEnemyAfterDelay(chicken);
  }

  /**
   * Handles the collision between a bottle and a ChickenSmall enemy.
   * @param {ThrowableObject} bottle - The throwable object.
   * @param {ChickenSmall} chickenSmall - The ChickenSmall enemy.
   */
  handleChickenSmallCollision(bottle, chickenSmall) {
    chickenSmall.isDead = true;
    //this.smallChickenDead_sound.play();
    this.removeEnemyAfterDelay(chickenSmall);
  }

  /**
   * Handles the collision between a bottle and an Endboss enemy.
   * @param {ThrowableObject} bottle - The throwable object.
   * @param {Endboss} endboss - The Endboss enemy.
   */
  handleEndbossCollision(bottle, endboss) {
    endboss.hit();
    this.statusBarEndboss.setPercentage(endboss.energy);
    bottle.hitEndboss();
    endboss.playAnimation(endboss.IMAGES_HURT);
  }

  /**
   * Removes a bottle from the throwableObjects list after collision.
   * @param {ThrowableObject} bottle - The throwable object to be removed.
   */
  removeBottleAfterCollision(bottle) {
    const bottleIndex = this.throwableObjects.indexOf(bottle);
    if (bottleIndex > -1) {
      this.throwableObjects.splice(bottleIndex, 1);
    }
  }

  /*
  //collision between character and enemies
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  //collision between character and coins
  checkCollisionsCoin() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoins();
        this.statusBarCoin.setPercentage(this.character.coin);
        this.level.coins.splice(index, 1);
      }
    });
  }

  //collision between enemy and bottle
  checkCollisionsBottle() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottles();
        this.statusBarBottle.setPercentage(this.character.bottle);
        this.level.bottles.splice(index, 1);
      }
    });
  }*/

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
          //this.chickenDead_sound.play();
          this.removeEnemyAfterDelay(enemy);
        } else if (enemy instanceof ChickenSmall) {
         enemy.isDead = true;
        //this.smallChickenDead_sound.play();
          this.removeEnemyAfterDelay(enemy);
        }
      }
    });
  }

  removeEnemyAfterDelay(enemy) {
    setTimeout(() => {
      const enemyIndex = this.level.enemies.indexOf(enemy);
      if (enemyIndex > -1) {
        this.level.enemies.splice(enemyIndex, 1); // Removing the enemy at the index location found
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
  /*
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection){
            this.flipImageBack(mo);
        }
    }*/
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
