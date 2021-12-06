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
        fontFamily: 'GoogleSans'
      }, 2, 1, 0)
      .setFontSize(100)
      .setInteractive()
      .once('pointerdown', this.startGame, this);
    let help = this.add
      .text(this.cameras.main.width / 2 - 120, this.cameras.main.height / 2 + 100, 'HELP', {
        fontFamily: 'GoogleSans'
      }, 2, 1, 0)
      .setFontSize(100)
      .setInteractive()
      .once('pointerdown', this.openHelp, this);
    this.registry.set('time', 0);
    this.registry.set('level', "");
  }

  update() {}

  startGame() {
    this.scene.start('NameInput');
  }
  openHelp() {
    this.scene.start('Help');
  }
}