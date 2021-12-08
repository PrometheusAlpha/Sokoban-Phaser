export default class NameInput extends Phaser.Scene {
  constructor() {
    super({
      key: 'NameInput'
    });
  }
  preload() {}

  create() {
    this.cameras.main.setBackgroundColor('#808080');
    let player = prompt("Please enter your name", "name");
    if (player != null) {
      this.registry.set('name', player);
      this.scene.start('level1');
    }
  }
}