import LevelCore from "./scenes/LevelCore.js";
import Start from "./scenes/Start.js";
import EndScene from "./scenes/EndScene.js";
import Narration from "./scenes/Narration.js";
import Help from "./scenes/Help.js";
import NameInput from "./scenes/NameInput.js";
import {
  LevelMap,
  convertToNumber
} from "./consts/LevelMap.js";

const levelKeysArr = Object.keys(LevelMap);
const scenes = [Start, Narration, NameInput, Help, EndScene];
const length = levelKeysArr.length;
localStorage.setItem("turns", "[]");


for (let i = 0; i < length; i++) {
  scenes.push(new LevelCore(levelKeysArr[i], convertToNumber(LevelMap[levelKeysArr[i]]), levelKeysArr[(i + 1) % length]));
}

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
  scene: scenes
};

let game = new Phaser.Game(config);