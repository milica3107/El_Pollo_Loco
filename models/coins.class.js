/**
 * Class representing a coin in the game.
 * Extends the MovableObject class.
 */
class Coin extends MovableObject {
    y = 200;
    width = 120;
    height = 120;

    IMAGES_COIN = [
        'grafiken/img_pollo_locco/img/8_coin/coin_1.png',
        'grafiken/img_pollo_locco/img/8_coin/coin_2.png'
    ];
  
    /**
   * Creates a new Coin instance.
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   */
    constructor() {
        super().loadImage('grafiken/img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 1000; 
        this.y = 150 + Math.random() * 150;
        this.speed = 0.2 + Math.random() * 0.25;
        this.animate();
    }

    /**
   * This function is used to show animate of the coin
   */
    animate() {
        setInterval(() => {
         this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}