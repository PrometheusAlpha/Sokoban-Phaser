import LevelCore from './LevelCore.js';
import {
  LevelMap
} from '../consts/LevelMap.js';

class Game extends LevelCore {
  // level;
  constructor() {
    super({
      key: "level2"
    });
    this.level = LevelMap['level2'];
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