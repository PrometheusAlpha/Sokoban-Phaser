export default class Start extends Phaser.Scene {
  constructor() {
    super({
      key: 'Start'
    });
  }
  preload() {
    this.load.image('bg', 'assets/menubg.png');
  }
  create() {
    this.add.image(576, 576, 'bg');
    let start = this.add
      .text(this.cameras.main.width / 2 - 140, this.cameras.main.height / 2, 'START', {
        fontFamily: 'Lora, serif'
      }, 2, 1, 0)
      .setFontSize(100)
      .setInteractive()
      .once('pointerdown', this.startGame, this);
    let help = this.add
      .text(this.cameras.main.width / 2 - 120, this.cameras.main.height / 2 + 100, 'HELP', {
        fontFamily: 'Lora, serif'
      }, 2, 1, 0)
      .setFontSize(100)
      .setInteractive()
      .once('pointerdown', this.openHelp, this);
  }

  update() {}

  startGame() {
    this.scene.start('level7');
  }
  openHelp() {
    this.scene.start('Help');
  }
}