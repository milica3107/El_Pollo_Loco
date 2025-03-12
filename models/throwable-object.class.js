/**
 * Represents a throwable object, like a bottle, with physics and animations.
 */
class ThrowableObject extends MovableObject{
    ROTATION_BOTTLE = [
        'grafiken/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'grafiken/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'grafiken/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'grafiken/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    BOTTLE_SPLASH = [
        'grafiken/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'grafiken/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'grafiken/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'grafiken/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'grafiken/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'grafiken/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    bottle_sound = new Audio('audio/bottle-throwing.mp3');
    
   /**
   * Initializes a throwable object at the given position.
   * @param {number} x - Initial x-coordinate.
   * @param {number} y - Initial y-coordinate.
   */
    constructor(x, y, otherDirection) {
        super().loadImage('grafiken/img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.ROTATION_BOTTLE);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.direction = otherDirection ? -1 : 1;
       this.throw();
    }

    /**
     * This function is used to throw a bottle.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        let interval = setInterval(() => {
            this.x += 8 * this.direction;
            this.playAnimation(this.ROTATION_BOTTLE);
    
        if (this.y > 300) {
            clearInterval(interval);
            this.showSplash();
            this.playBottleSound();
        }
    }, 25);
    }

    /**
     * This function is used to show images splash of bottle
     */
    showSplash() {
        this.playAnimation(this.BOTTLE_SPLASH);
    }

    /**
     * This function is used to display the movement of the bottle
     */
    move() {
        this.x += this.speedX;
    }

     /**
     * This function is used to show sound of bottle
     */
    playBottleSound() {
        if (!soundEnabled) return;
        this.bottle_sound.currentTime = 0; 
        this.bottle_sound.play();
    
        setTimeout(() => {
            this.bottle_sound.pause();
            this.bottle_sound.currentTime = 0; 
        }, 1000); 
    }
}