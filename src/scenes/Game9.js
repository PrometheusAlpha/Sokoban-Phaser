import LevelCore from './LevelCore.js';
import {
  LevelMap
} from '../consts/LevelMap.js';

class Game extends LevelCore {
  // level;
  constructor() {
    super("level9");
    this.level = LevelMap['level9'];
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