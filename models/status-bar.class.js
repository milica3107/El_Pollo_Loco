/**
 * Represents the health status bar in the game.
 */
class StatusBar extends DrawableObject {
    IMAGES = [
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'grafiken/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' 

    ];

    percentage = 100;
    
   /**
   * Initializes the health status bar and sets default values of the character.
   */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 38;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

     /**
     * This function is used to set the percentage of the character energy.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.resolveImageIndex();
        if (index !== undefined) {

        let path = this.IMAGES[index];
        this.img = this.imageCache[path];
    }
    }
        
    /**
    * This function is used to return the correct mumber of the image for the current energy.
    */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        }else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        }else {
            return 0;
            }
        } 
}