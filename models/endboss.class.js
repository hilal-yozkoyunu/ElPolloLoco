class Endboss extends MovableObject {
  height = 400;
  width = 290;
  y = 55;
  firstContact = false;
  isDead = false;
  i = 0;
  energy = 50;


  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 5300;
    this.speed = 10 + Math.random() * 1.2;
    this.offset = { top: 60, right: 20, bottom: 90, left: 20 };
    this.animate();
  }

distanceToEndboss(distance) {
  return Math.abs(this.x - this.world.character.x) < distance;
}

selectAnimation() {
  setInterval(() => {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }, 200);
}

moveTowardsCharacter() {
  if (this.world.character.x < 4150 && !this.firstContact) {
      this.i = 0;
      this.firstContact = true;
  }
  if (this.x - this.world.character.x > 0) { // If the endboss is to the right of the character
      this.moveLeft();
      this.otherDirection = false; // Mirror image
  } else {
      this.moveRight();
      this.otherDirection = true; // Do not mirror image
  }
}

chasingCharacter() {
  if (this.world && this.distanceToEndboss(400)) {
      this.selectAnimation();
      this.moveTowardsCharacter();
  }
}

animate() {
  setInterval(() => {
      if (this.energy === 0) {
          this.isDead = true;
          
          this.playAnimation(this.IMAGES_DEAD);
          
          
      } else if (this.world && this.distanceToEndboss(450) && !this.distanceToEndboss(400) && !this.isDead) {
          this.playAnimation(this.IMAGES_ALERT);
      } else if (!this.isDead) {
          this.chasingCharacter();
      }
  }, 80);
}
}

