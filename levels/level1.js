/**
 * Initializes the first level of the game.
 * This level includes bottles, coins, enemies, clouds, and background objects.
 */
/**
 * Creates and initializes the first game level with predefined game elements.
 * @function createLevel1
 * @description Sets up the level with the following:
 * - Bottles at specific positions
 * - Coins with positions and values
 * - Enemies, including normal chickens, small chickens, and endboss
 * - Clouds with specific images and positions
 * - Background layers for scenery
 */
let level1 = createLevel1();
function createLevel1() {
return new Level (
    [
    new Chicken(2100),
    new Chicken(2600),
    new Chicken(3000),
    new Chicken(4000),
    new BabyChicken(600), 
    new BabyChicken(900), 
    new BabyChicken(1500), 
    new BabyChicken(1900),
    new Endboss()
    ],

    [
        new Cloud('grafiken/img_pollo_locco/img/5_background/layers/4_clouds/1.png', 0),
        new Cloud('grafiken/img_pollo_locco/img/5_background/layers/4_clouds/2.png', 719*3),
        new Cloud('grafiken/img_pollo_locco/img/5_background/layers/4_clouds/1.png', 0),
        new Cloud('grafiken/img_pollo_locco/img/5_background/layers/4_clouds/2.png', 719*3),
    ],
    
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ],
    
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],

    [
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/air.png', -719),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/air.png', 0),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/air.png', 719),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/air.png', 719*2),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/air.png', 719*3),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('grafiken/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719*3),
    ]
);
}