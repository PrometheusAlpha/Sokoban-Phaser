//Import các Scene cần dùng
import Game from "./scenes/Game.js";

//Cài đặt các thông số cho Game của mình
const config = {
    type: Phaser.AUTO,
    width: 1152,
    height: 1152,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200}
        }
    },
    scene: [Game]
};

//Khởi tạo game và runnnnnnnnnnnnn
var game = new Phaser.Game(config);