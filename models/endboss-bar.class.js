/**
 * Represents the Endboss status bar in the game.
 */
class EndbossBar extends DrawableObject {
    IMAGES_BOSS = [
        'grafiken/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'grafiken/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'grafiken/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'grafiken/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'grafiken/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'grafiken/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    energy = 100;

   /**
   * Initializes the Endboss status bar and sets default values.
   */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSS);
        this.x = 480;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.liveInterval(100);
    }

     /**
     * This function is used to set the percentage of the endboss energy.
     */
    liveInterval(energy) {
        this.energy = energy; 
        let index = this.liveImageIndex();
        
        if (index !== undefined) {
            let path = this.IMAGES_BOSS[index]; 
        this.img = this.imageCache[path]; 
        }
    }

    /**
     * This function is used to return the correct mumber of the image for the current energy.
     */
        liveImageIndex() {
            if (this.energy == 100) {
                return 5;
            } else if (this.energy > 80) {
                return 4;
            } else if (this.energy > 60) {
                return 3;
            }else if (this.energy > 40) {
                return 2;
            } else if (this.energy > 20) {
                return 1;
            }else {
                return 0;
            }
        } 
    }