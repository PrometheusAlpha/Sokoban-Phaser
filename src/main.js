import Game from "./scenes/Game.js";
import Game2 from "./scenes/Game2.js";
import Game3 from "./scenes/Game3.js";
import Game4 from "./scenes/Game4.js";
import Game5 from "./scenes/Game5.js";
import Game6 from "./scenes/Game6.js";
import Game7 from "./scenes/Game7.js";
import Game8 from "./scenes/Game8.js";
import Game9 from "./scenes/Game9.js";
import Game10 from "./scenes/Game10.js";

const config = {
  type: Phaser.AUTO,
  width: 1152,
  height: 1152,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200
      }
    }
  },
  scene: [Game, Game2, Game3, Game4, Game5, Game6, Game7, Game8, Game9, Game10]
};

let game = new Phaser.Game(config);