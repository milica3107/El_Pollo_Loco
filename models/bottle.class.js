/**
 * Class representing a bottle in the game.
 * Extends the MovableObject class.
 */
class Bottle extends MovableObject {
    y = 360;
    height = 60;
    width = 60;

    IMAGES_BOTTLE = [
       'grafiken/img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png'
    ];
    
    /**
   * Creates a new Bottle instance.
   * @param {number} x - The x-coordinate of the bottle.
   */
    constructor() {
        super().loadImage('grafiken/img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 200 + Math.random() * 1800; 
        this.animate();
    }
    
    /**
     * This function is used to animate the images of the bottle.
     */
    animate() {
         setInterval(() => {
         this.playAnimation(this.IMAGES_BOTTLE);
        }, 200);
    }
}