/**
 * Represents the coin status bar in the game.
 */
class CoinBar extends DrawableObject {
    IMAGES_COINS = [
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    amount = 0;
    
    /**
   * Initializes the coin status bar and sets default values.
   */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 30;
        this.y = 80;
        this.width = 200;
        this.height = 60;
        this.setAmount(0);
    }

    /**
     * This function is used to set the amount of the coin statusbar.
     */
    setAmount(amount) {
        this.amount = amount;  
        let index = this.resolveImageIndex(); 
    
        if (index !== undefined) {
            let path = this.IMAGES_COINS[index];
            this.img = this.imageCache[path]; 
        }
    }

    /**
     * This function is used to return the correct mumber of the image for the current amount.
     */
    resolveImageIndex() {
        if (this.amount == 0) {
            return 0;
        } else if (this.amount > 0 && this.amount <= 20) {
            return 1;
        } else if (this.amount > 20 && this.amount <= 40) {
            return 2;
        } else if (this.amount > 40 && this.amount <= 60) {
            return 3;
        } else if (this.amount > 60 && this.amount <= 80) {
            return 4;
        } else if (this.amount > 80 && this.amount <= 100) {
            return 5;
        }
    }
}