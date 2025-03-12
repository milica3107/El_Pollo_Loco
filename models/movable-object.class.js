/**
 * MovableObject extends DrawableObject and adds movement and physics.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    hitCooldown = false;

   /**
   * Applies gravity to the object.
   */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY != 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
        if (this instanceof Character && this.y > 170) {
            this.y = 175;
            this.speedY = 0;
        }
        }, 1000 / 25);
    }
    
   /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if above ground.
   */
   isAboveGround() {
        if (this instanceof Chicken || this instanceof BabyChicken) {
        return this.y < 170;  
    }
        if (this instanceof ThrowableObject) {
        return this.y > 170;  
    }
        return this.y < 170;  
    }
    
     /**
     * 
     * checking if object is colliding with enemy
     * @param {object} mo 
     * @returns object is colliding with enemy
     */
   isColliding(mo) {
    return this.x + this.width > mo.x && 
           this.y + this.height > mo.y &&
           this.x < mo.x + mo.width &&
           this.y < mo.y + mo.height;
    }

    /**
     * This function is used to lower the energy, if the character is hit.
     */
    hit() {
        if (this.hitCooldown) {
            return;
        }
        if (this.isJumping) {
            this.lastHit = 0;
        }
        this.energy -= 10;
        this.lastHit = new Date().getTime();
        if (this.energy <= 0) {
            this.energy = 0;
        } 
        this.hitCooldown = true; 
        setTimeout(() => {
            this.hitCooldown = false; 
        }, 1000);
    }

     /**
     * This function is used to return, that the character is hurt or not.
     */
    isHurt() {
        if (this.isJumping) {
            return false;
        }
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }   

    /**
     * This function is used to set the energy of an enemy to 0.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * This function is used to play a animation of images in a intervall.
     */
    playAnimation(images, animationType) {
        let i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; 
      
        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }
        if (animationType === 'jump') {
            if (this.isJumping && i === images.length - 1) {
                this.isJumping = false;
                this.img = this.imageCache[this.IMAGES_IDLE[0]]; 
                this.currentImage = 0;
            }
        }
    }
    
    /**
     * This function is used to let the object move right,
     */
    moveRight() {
        this.x += this.speedX;
    }

    /**
     * This function is used to show if enemy dead is.
     */
    kill() {
        this.energy = 0;
    }

    /**
     * This function is used to let fhe object move left.
     */
    moveLeft() {
        this.x -= this.speedX;
    }

    /**
     * This function is used to show the characters jump
     */
    jump() {
        if (this.isAboveGround()) {
            return;
        }
        this.speedY = 20;
        this.isJumping = true;
    }
}