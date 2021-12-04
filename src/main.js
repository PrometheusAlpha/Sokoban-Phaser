import LevelCore from "./scenes/LevelCore.js";
import {
    LevelMap
} from "./consts/LevelMap.js";
import Start from "./scenes/Start.js";
import Narration from "./scenes/Narration.js";
import Help from "./scenes/Help.js";

const levelKeysArr = Object.keys(LevelMap);
const levelArr = [Start, Narration, Help];

for (let i = 0; i < levelKeysArr.length; i++) {
    levelArr.push(new LevelCore(levelKeysArr[i], LevelMap[levelKeysArr[i]], levelKeysArr[(i + 1) % levelKeysArr.length]));
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
    scene: levelArr
};

let game = new Phaser.Game(config);