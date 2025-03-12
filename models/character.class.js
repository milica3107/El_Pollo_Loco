/**
 * Class representing the main character.
 * Inherits from MovableObject and includes animations, sounds, and interactions.
 */
class Character extends MovableObject {
    amount;
    idleTimer = 0;
    height = 250;
    width = 100;
    y = 165;
    speedX = 10;
    isJumping = false;
    isSleeping = false;

    IMAGES_IDLE = [
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        'grafiken/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'grafiken/img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'grafiken/img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'grafiken/img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'grafiken/img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ];

    world;
    walking_sound = new Audio('audio/walking.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');

    /**
   * Creates the main character instance and initializes its properties.
   */
    constructor() {
        super().loadImage('grafiken/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.amount = 0;
    }

    /**
    * This function is used to animate the images and movement of the character.
    */
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            this.handleMovement();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 25);

        let interval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.showGameOver();
                clearInterval(interval);
            } else if (this.isHurt()) {
                this.playHurtCharacter();
            } else if (this.isAboveGround()) {
                this.playJumpingCharacter();
                this.playAnimation(this.IMAGES_JUMPING, 'jump');
            } else {
                this.isJumping = false;
                this.handleIdleState();
            }
        }, 150);
    }

    /**
     * Handles the movement of the character based on the keyboard input.
     * This function also handles sound effects when the character is moving or jumping.
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingSound();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSound();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.playJumpSound();
        }
    }

    /**
     * This function also resets the idle timer and manages the character's sleep state.
     */
    handleIdleState() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playWalkingCharacter();
        } else {
            this.idleTimer++;
            if (this.idleTimer > 150) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                this.isSleeping = true;
            } else {
                this.playAnimation(this.IMAGES_IDLE);
                this.isSleeping = false;
            }
        }
    }

    /**
     * This function is used to show the character's sleep.
     */
    playIdleAnimation() {
        if (!this.isDead() && !this.isHurt() && !this.isAboveGround()) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * This function is used to show the character's jumping.
     */
    playJumpingCharacter() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.isSleeping = false;
            this.idleTimer = 0;
            this.currentImage = 0;
        }
    }

    /**
     * This function is used to show hurt of the character.
     */
    playHurtCharacter() {
        this.playAnimation(this.IMAGES_HURT);
        this.playHurtSound();
    }

    /**
     *  This function is used to show walk animation
     */
    playWalkingCharacter() {
        this.playAnimation(this.IMAGES_WALKING);
        this.isSleeping = false;
        this.idleTimer = 0;
    }

    /**
      * This function is used to show game over.
      */
    showGameOver() {
        if (!gameOver) {
            document.getElementById('winGame').classList.add('d-none');
            document.getElementById('gameOver').classList.remove('d-none');
            document.getElementById('canvas').classList.add('d-none');

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
      * These functions show the sound walking of the character
      */
    playWalkingSound() {
        if (!soundEnabled) return;
        this.walking_sound.currentTime = 0;
        this.walking_sound.play();
    }

    /**
     * These functions show the sound jump of the character
     */
    playJumpSound() {
        if (!soundEnabled) return;
        this.jump_sound.currentTime = 0;
        this.jump_sound.play();
    }

    /**
     * These functions show the sound hurt of the character
     */
    playHurtSound() {
        if (!soundEnabled) return;
        this.hurt_sound.play();
    }
}