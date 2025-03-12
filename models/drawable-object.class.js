/**
 * Represents an object that can be drawn on the canvas.
 */
class DrawableObject {
    img;
    imageCache = {};
    x = 120;
    y = 180;
    height = 150;
    width = 100;
    currentImage = 0;

    /**
     * This function loads an image into the DrawableObject's image property.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function is used to draw the images.
     */
    draw(ctx) {
        try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e); 
            console.log('Could not load image', this.img);
        }
    }

    /**
     * This function is used to draw a frame around the objects.
     */
    drawFrame(ctx) {
     if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken) {
       ctx.beginPath();
        ctx.stroke();
       }
    } 

    /**
     * This function loads multiple images into an image cache for later use.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }
}