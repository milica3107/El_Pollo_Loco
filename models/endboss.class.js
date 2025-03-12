/**
 * Represents the Endboss character in the game, extending MovableObject.
 * Handles animations, state transitions, movement, and interactions with the player.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    energy = 100;
    speed = 8;
    speedX = 4;
    isMovingRight = true;
    startingX;
    maxRightX;
    isWalkingLeft = true;
    isWalking = false;
    isAngry = false;
    isAttacking = false;
    amount;
    world;

    IMAGES_WALKING = [
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ANGRY = [
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'

    ];

    IMAGES_DEAD = [
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'grafiken/img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

   /**
   * Initializes the Endboss with default properties and loads images and sounds.
   */
    constructor() {
        super().loadImage('grafiken/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.x = 1800;
        this.startingX = this.x;
        this.maxRightX = this.startingX + 500;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.energy = 100;
        this.animate();
        this.endbossHurt();
        this.endbossDead();
    }

    /**
     * This function is used to animate the movement of the endboss.
     */
    animate() {
        let intervalBoss = setInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(intervalBoss);
            } else if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT);
                this.playAnimation(this.IMAGES_ANGRY);
            } else if (this.isWalkingLeft || this.isWalking) {
                this.playAnimation(this.IMAGES_WALKING);
            }  else  if (this.isAngry) {
                this.playAnimation(this.IMAGES_ANGRY);
            } else if (this.isWalking) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 300);
    }

    /**
    * This function is used to apply damage to the endboss.
    */
    endbossHurt() {
        this.isHurt = true;
        this.img = this.imageCache[this.IMAGES_HURT[0]]; 
        setTimeout(() => {
            this.isHurt = false; 
        }, 500);
    }

    /**
    * This function is used to animate the movement of the endboss to the left
    */
    moveEndbossLeft() {
        this.isWalkingLeft = true;
        this.otherDirection = false;
        this.x -= this.speedX; 
    }

    /**
    * This function is used to animate the movement of the endboss to the right
    */
    moveEndbossRight() {
        this.isWalkingLeft = false;
        this.otherDirection = true;
        this.isWalking = true;      
        this.x += this.speedX; 
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
    * This function is used to animate that the endboss died
    */
    endbossDead() {
        this.playAnimation(this.IMAGES_DEAD);
    }
}