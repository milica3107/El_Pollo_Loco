let canvas;
let world;
let controlMobile;
let controlMobileRight;
let keyboard = new Keyboard();
let soundEnabled = localStorage.getItem('soundEnabled') === 'false'; 
let backgroundMusic = new Audio('audio/game-musik.mp3'); 
let isMobileDevice = false;
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
let chickenMusik = new Audio('audio/chicken-sound.mp3');
let walkingMusik = new Audio('audio/walking.mp3');
let jumpMusik = new Audio('audio/jump.mp3');
let hurtMusik = new Audio('audio/hurt.mp3');
let gameOver = false;
let winGame = false;

/**
 * This function is used to check the screen.
 */
function init() {
    canvas = document.getElementById('canvas');
    checkScreenOrientation();
    if (isMobileDevice) {
        controlButton(); 
    } 
    loadingGame();
}

/**
 * This function is show start menu.
 */
function loadingGame() {
    let startContainer = document.getElementById('startContainer');
    startContainer.classList.remove("d-none");
    let start = document.getElementById('start');
    start.addEventListener('click', startGame);
    removeControlButton();
}

/**
 * This function is used to remove start menu and started the game.
 */
function startGame() {
    let startContainer = document.getElementById('startContainer');
    startContainer.classList.add("d-none");
        soundControlContainer.classList.remove('d-none');
    let exitContainer = document.getElementById('exitContainer');
        exitContainer.classList.remove('d-none');
    resetControls();
    mobileScreen();
    toggleSound();
    world = new World(canvas, keyboard);
}

/**
 * This function is used to show game over and return button.
 */
function returnGame() {
    document.getElementById('gameOver').classList.add('d-none');
    location.href = "index.html" 
    backgroundMusic.pause();
}

/**
 * This function is used to show instructions of the game
 */
function showInstructions() {
    closeInfo();
    document.getElementById('instructions').classList.remove('d-none');
}

/**
 * This function is used to remove instructions of the game
 */
function closeInstructions() {
    document.getElementById('instructions').classList.add('d-none');
}

/**
 * This function is used to show info how to play the game
 */
function infoInstruction() {
    closeInstructions();
    document.getElementById('infoSection').classList.remove('d-none');
}

/**
 * This function is used to remove info how to play the game
 */
function closeInfo() {
    document.getElementById('infoSection').classList.add('d-none');
}

/**
 * This function is used to show and remove sound of backgroundmusic 
 */
function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    let soundControl = document.getElementById('soundControl');
    if (soundEnabled) {
        backgroundMusic.play();
        soundControl.src = 'audio/img/tone.png'; 
    } else {
        backgroundMusic.pause();
         backgroundMusic.currentTime = 0;
        soundControl.src = 'audio/img/no-tone.png'; 
    }
}

/**
 * This function is used to show exit the game
 */
function exitGame() {
    let exitContainer = document.getElementById('exitContainer');
    exitContainer.classList.remove('d-none');
    location.href = "index.html"
}

/**
 * This function is used to show controle button for mobile
 */
function controlButton() {
    let controlMobile = document.getElementById('controlMobile');
    controlMobile.classList.remove('d-none');

    let controlMobileRight = document.getElementById('controlMobileRight');
    controlMobileRight.classList.remove('d-none');
}

/**
 * This function is used to remove controle button for mobile
 */
function removeControlButton() {
    let controlMobile = document.getElementById('controlMobile');
    controlMobile.classList.add('d-none');
    
    let controlMobileRight = document.getElementById('controlMobileRight');
    controlMobileRight.classList.add('d-none');
}

/**
 * This function is used to show mobile screen
 */
function mobileScreen() {
    let fullscreenMobile = document.getElementById('fullscreenMobile');
    fullscreenMobile.classList.remove('d-none');
}

/**
 * This function is used to show fullscreen
 */
function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) { 
        element.webkitRequestFullscreen();
      }
}

/**
 * This function is used to close fullscreen
 */
function exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { 
      document.webkitExitFullscreen();
    }
  }

  /**
 * This function is used to button for fullscreen
 */
  function toggleFullScreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        enterFullScreen(startContainer);
    } else {
        exitFullScreen();
    }
}

/**
 * This function is used to check the screen orientation.
 */
function checkScreenOrientation() {
    const rotateOverlay = document.getElementById('rotateOverlay');

    const isSmallScreen = window.innerWidth < 1000;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    if (isSmallScreen && isPortrait) {
        rotateOverlay.classList.remove('d-none');
    } else {
        rotateOverlay.classList.add('d-none');
    }
}

/**
 * This function is used to reset controls button for mobile
 */
function resetControls() {
    if (window.innerWidth <= 1000) {
        isMobileDevice = true; 
        controlButton(); 
    } else {
        isMobileDevice = false;
        removeControlButton(); 
    }
}

/**
 * Monitor screen size and orientation
 */
window.addEventListener('resize', checkScreenOrientation, resizeCanvas);
window.addEventListener('orientationchange', checkScreenOrientation);

/**
 * Initial check when loading the page
 */
window.addEventListener('load', checkScreenOrientation);

/**
 * This function is used to track which keys are pressed.
 */
window.addEventListener("keydown", (e) => {
    if (!gameOver && !winGame && window.innerWidth > 1000) {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    
    if (e.keyCode == 32) {
        e.preventDefault();
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
}
});

/**
 * This function is used to track which keys are released.
 */
window.addEventListener("keyup", (e) => {
    if (!gameOver && !winGame && window.innerWidth > 1000) {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    
    if (e.keyCode == 32) {
        e.preventDefault();
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        setTimeout (() => {
            keyboard.D = false;
        }, 50);
    }
}
});

/**
 * These functions show the keyboard for mobile screen
 * * @function
 */
function touchLeft(isPressed) {
    if (window.innerWidth <= 1000) {
    keyboard.LEFT = isPressed;
    }
}

/**
 * These functions show the keyboard for mobile screen
 * * @function
 */
function touchRight(isPressed) {
    if (window.innerWidth <= 1000) {
    keyboard.RIGHT = isPressed;
    }
}

/**
 * These functions show the keyboard for mobile screen
 * * @function
 */
function touchUp(isPressed) {
    if (window.innerWidth <= 1000) {
    keyboard.SPACE = isPressed;
    }
}

/**
 * These functions show the keyboard for mobile screen
 * * @function
 */
function touchBottle(isPressed) {
    if (window.innerWidth <= 1000) {
    keyboard.D = isPressed;
    }
}

/**
* Disables the context menu and certain touch events for all buttons with the class `.control-mobile-btn`.
*
* to prevent the standard actions for context menu (right click) and touch events (touchstart and touchend).
* @function
*/
function disableContextMenu() {
    document.querySelectorAll('.control-mobile-btn').forEach(btn => {
        btn.addEventListener('contextmenu', (e) => e.preventDefault()); 
        btn.addEventListener('touchstart', (e) => e.preventDefault()); 
        btn.addEventListener('touchend', (e) => e.preventDefault());
    });
}

/**
 * Call after the DOM elements are loaded
 */
window.addEventListener('DOMContentLoaded', disableContextMenu);

/**
 * Resizes the canvas element to match the current window dimensions.
 * @function
 */
function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}

/**
 * Restarts the game by resetting the UI and reinitializing the game world.
 * @function
 * @returns {boolean} Always returns `false` to prevent any default actions.
 */
function restart() {
    document.getElementById('winGame').classList.add('d-none');
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('startContainer').classList.add('d-none');
    let controlMobile = document.getElementById('controlMobile');
        controlMobile.classList.remove('d-none');
    let controlMobileRight = document.getElementById('controlMobileRight');
        controlMobileRight.classList.remove('d-none');
    let soundControlContainer = document.getElementById('soundControlContainer');
        soundControlContainer.classList.remove('d-none');
    let exitContainer = document.getElementById('exitContainer');
        exitContainer.classList.remove('d-none');
    canvas = document.getElementById('canvas');
    canvas.classList.remove("d-none");
    level1 = createLevel1();
    gameOver = false;
    soundEnabled = localStorage.getItem('soundEnabled') === 'false';
    world.stopGame();
    world = new World(canvas, keyboard);
    backgroundMusic.pause();
    toggleSound();
    return;
}

/** This function stops all sounds in the game
 * @function
 */
function stopSounds() {
    backgroundMusic.pause();  backgroundMusic.currentTime = 0;
    chickenMusik.pause();  chickenMusik.currentTime = 0;
    walkingMusik.pause();  walkingMusik.currentTime = 0;
    jumpMusik.pause(); jumpMusik.currentTime = 0;
    hurtMusik.pause(); hurtMusik.currentTime = 0;
    soundEnabled = false; 
}