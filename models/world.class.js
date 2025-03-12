/**
 * Represents the game world, managing the character, level, objects, and sounds.
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    endbossbar = new EndbossBar();
    endboss = this.level.enemies[8];
    throwingInProgress = false;
    lastThrowTime = 0;
    throwInterval = 400;
    chicken_sound = new Audio('audio/chicken-sound.mp3');

    /**
   * Initializes the game world with a canvas and keyboard input.
   * @param {HTMLCanvasElement} canvas - The game canvas element.
   * @param {Object} keyboard - The keyboard input handler.
   */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.gameLoop = null;
        this.throwLoop = null;
        this.collisionLoop = null;
        this.run();
    }

    /**
    * This function is used to hand over the world object to the character.
    */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * This function is used to run the checks every 200ms.
     */
    run() {
        this.gameLoop = setInterval(() => {
            this.checkCollisions();
        }, 100);
        this.throwLoop = setInterval(() => {
            this.checkThrowObjects();
        }, 50);
        this.collisionLoop = setInterval(() => {
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkCharacterNearToEndboss();
            this.checkCollisionsBottleWithEndBoss();
            this.checkCollisionsBottleWithEnemies();
        }, 100);
    }

    /**
     * This function is used to throw a bottle, if the character has one.
     */
    checkThrowObjects() {
        const currentTime = Date.now();
        if (this.keyboard.D && this.bottleBar.amount > 0 && !this.character.isSleeping) {
            if (this.throwingInProgress === false) {
                this.throwingInProgress = true;
                let bottleX = this.character.x + (this.character.otherDirection ? -30 : this.character.width);
                let bottle = new ThrowableObject(bottleX, this.character.y + 100, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.bottleBar.setAmount(this.bottleBar.amount - 11);
                this.lastThrowTime = currentTime;
                setTimeout(() => {
                    this.throwingInProgress = false;
                }, this.throwInterval);
            }
        }
    }

    /**
    * Checks for collisions between the character and enemies in the game world.
    * @function checkCollisions
    * @memberof World
    */
    checkCollisions() {
        let collisionHandled = false;
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (this.character.isAboveGround() && this.character.speedY <= 10) {
                    if (enemy instanceof Chicken || enemy instanceof BabyChicken) {
                        enemy.kill();
                        this.character.speedY = 5;
                        this.playChickenSound();
                        collisionHandled = true;
                    }
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    collisionHandled = true;
                }
            }
        });
    }

    /**
     * This function is used to check if the charackter is near to the endboss.
     */
    checkCharacterNearToEndboss() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            let distance = Math.abs(this.character.x - this.endboss.x);
            if (distance < 900) {
                if (this.character.x < this.endboss.x) {
                    this.endboss.moveEndbossLeft();
                    this.endboss.speedX = 20;
                } else if (distance < 200) {
                    this.distanceEndbossAndCharacter();
                } else {
                    this.movingEndboss();
                }
            }
        }
    }

    /**
     * This function checks if the endboss should be moving right or left
     */
    movingEndboss() {
        if (this.character.x > this.endboss.x) {
            this.endboss.moveEndbossRight();
            this.endboss.speedX = 15;
        }
    }

    /**
     * This function sets the endboss into an angry state and temporarily prevents it from walking left.
     */
    distanceEndbossAndCharacter() {
        this.endboss.isAngry = true;
        this.endboss.isWalkingLeft = false;
        this.endboss.isWalking = false;
        setTimeout(() => {
            this.endboss.isAngry = false;
        }, 5000);
    }

    /**
     * This function is used to check if the bottle hits the endboss.
     */
    checkCollisionsBottleWithEndBoss() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            this.throwableObjects.forEach((bottle) => {
                if (endboss.isColliding(bottle)) {
                    this.endboss.energy -= 25;
                    this.endboss.endbossHurt();
                    this.playChickenSound();
                    this.endbossbar.liveInterval(this.endboss.energy);
                    this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                    if (this.endboss.energy <= 0) {
                        this.showWinGame();
                    }
                }
            });
        }
    }

    /**
     * This function is used to show win game.
     */
    showWinGame() {
        if (!winGame) {
            document.getElementById('gameOver').classList.add('d-none');
            document.getElementById('canvas').classList.add('d-none');
            document.getElementById('winGame').classList.remove('d-none');

            soundControlContainer.classList.add('d-none');
            stopSounds();

            exitContainer.classList.add('d-none');
            removeControlButton();
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                exitFullScreen();
            }
        }
    }

    /**
     * This function is used to check if the bottle hits an enemy.
     */
    checkCollisionsBottleWithEnemies() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    enemy.kill();
                    this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                }
            });
        });
    }

    /**
     * This function is used to check if the charackter colides with a coin and add it to the coin statusbar.
     */
    checkCoinCollisions() {
        this.level.coin.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coin.splice(index, 1);
                this.coinBar.setAmount(this.coinBar.amount + 20);
            }
        });
    }

    /**
     * This function is used to check if the charackter colides with a bottle and add it to the bottle statusbar.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottles, index) => {
            if (this.character.isColliding(bottles)) {
                this.level.bottles.splice(index, 1);
                this.bottleBar.setAmount(this.bottleBar.amount + 11);
            }
        });
    }

    /**
    * This function is used to draw the images on the canvas.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        //-------- space for fixed objects
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossbar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function is used to add the objects to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
    * This function is used to add images to the canvas.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * This function is used to flip the image of the character, if it moves back.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function is used to flip the image of the character back to the start direction.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * This function is used to play sound of chicken.
     */
    playChickenSound() {
        if (!soundEnabled) return;
        this.chicken_sound.currentTime = 0;
        this.chicken_sound.play();
        setTimeout(() => {
            this.chicken_sound.pause();
            this.chicken_sound.currentTime = 0;
        }, 1000);
    }

    /**
     * This function is used to stop the entire game.
     */
    stopGame() {
        clearInterval(this.gameLoop);
        clearInterval(this.throwLoop);
        clearInterval(this.collisionLoop);
    }
}