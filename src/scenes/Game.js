import LevelCore from './LevelCore.js';
import {
  LevelMap
} from '../consts/LevelMap.js';

class Game extends LevelCore {
  // level;
  constructor() {
    super({
      key: "level1"
    });
    this.level = LevelMap['level1'];
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();
  }

  update() {
    super.update();
    if (this.allTargetCovered()) {
      this.scene.start('Game2');
      console.log('all target covered');
    }
  }
}

export default Game;