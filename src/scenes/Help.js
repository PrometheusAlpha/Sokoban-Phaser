export default class Help extends Phaser.Scene {
  constructor() {
    super({
      key: "Help"
    });
  }

  preload() {
    this.load.image("help", "assets/help.png");
  }

  create() {
    this.add.image(576, 576, "help").setScale(1152 / 1280);
    this.input.keyboard.on('keydown', function () {
      this.scene.start("Start");
    }, this);
    this.input.on('pointerdown', function () {
      this.scene.start("Start");
    }, this);
  }

  update() {}

}