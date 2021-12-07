import LevelCore from "./scenes/LevelCore.js";
import {
  LevelMap
} from "./consts/LevelMap.js";
import Start from "./scenes/Start.js";
import EndScene from "./scenes/EndScene.js";
import Narration from "./scenes/Narration.js";
import Help from "./scenes/Help.js";
import {
  convertToNumber
} from "./consts/LevelMap.js";
import NameInput from "./scenes/NameInput.js";

const levelKeysArr = Object.keys(LevelMap);
const levelArr = [Start, Narration, NameInput, Help];
const length = levelKeysArr.length;

for (let i = 0; i < length; i++) {
  levelArr.push(new LevelCore(levelKeysArr[i], convertToNumber(LevelMap[levelKeysArr[i]]), levelKeysArr[(i + 1) % length]));
}
levelArr.push(EndScene);
localStorage.setItem("length", "[]");

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
  scene: levelArr
};

let game = new Phaser.Game(config);