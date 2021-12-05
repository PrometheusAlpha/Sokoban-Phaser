export default class Start extends Phaser.Scene {
  constructor() {
    super({
      key: 'EndScene'
    });
  }
  preload() {}
  create() {
    let time = this.registry.get('time');
    let level = this.registry.get('level');
    this.add.text(
      576,
      576,
      time, {
        font: '32px Lora',
        fill: '#fff'
      },
      this
    );
    this.add.text(
      576,
      776,
      level, {
        font: '32px Lora',
        fill: '#fff'
      },
      this
    );

  }

  update() {}

  startGame() {
    this.scene.start('Narration');
  }
  openHelp() {
    this.scene.start('Help');
  }
}