import LevelCore from './LevelCore.js';
import {
  LevelMap
} from '../consts/LevelMap.js';

class Game extends LevelCore {
  // level;
  constructor() {
    super("level4");
    this.level = LevelMap['level4'];
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }
}

export default Game;