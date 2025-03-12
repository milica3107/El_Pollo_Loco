/**
 * Represents a level in the game with various objects and enemies.
 */
class Level {
    enemies;
    clouds;
    bottles;
    coin;
    backgroundObjects;
    level_end_x = 2200;
    world;

   /**
   * Creates a new Level instance.
   */
    constructor(enemies, clouds, coin, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coin = coin;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}