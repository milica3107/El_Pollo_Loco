/**
 * Class representing a normal chicken enemy.
 * Inherits from MovableObject and includes animations and sounds.
 */
class Chicken extends MovableObject {
    y = 370;
    height = 60;
    width = 60;
    speedX = 1;
    
    IMAGES_WALKING = [
        'grafiken/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'grafiken/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'grafiken/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'grafiken/img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    
   /**
   * Creates a ChickenNormal object.
   * @param {number} x - The initial x-coordinate of the chicken.
   */
    constructor(x) {
        super().loadImage('grafiken/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = x; 
        this.speed = 0.2 + Math.random() * 0.25;
        this.applyGravity();
        this.animate();
    }

    /**
     * This function is used to animate the movement of the chickens.
     */
    animate() {
        setInterval(() => {
            if(!this.isDead()) {
            this.moveLeft();
        }
        }, 1000 / 60);
      
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
        }, 200);
    }

     /**
     * This function is used to show if chicken is dead
     */
    deadAnimation() {
        super.kill();
    }
}