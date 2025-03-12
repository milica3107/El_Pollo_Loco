/**
 * Class representing a cloud in the game.
 * Extends the MovableObject class.
 */
class Cloud extends MovableObject {
    y = 40;
    width = 500;
    height = 250;

   /**
   * Creates a new Cloud instance.
   * @param {number} x - The x-coordinate of the cloud.
   */
    constructor() {
      super().loadImage('grafiken/img_pollo_locco/img/5_background/layers/4_clouds/1.png');
      this.x = Math.random() * 2500; 
      this.animate();  
    }
    
     /**
     * This function show the movement of clouds
     */
    animate() {
      setInterval(() => {
        this.x -= 0.15;
      }, 1000 / 60);
    }
}