export default class NameInput extends Phaser.Scene {
  constructor() {
    super({
      key: 'NameInput'
    });
  }
  preload() {
    this.load.html('nameform', 'assets/html/input.html');
  }

  create() {
    this.cameras.main.setBackgroundColor('#808080');
    let player = prompt("Please enter your name", "name");
    if (player != null) {
      this.registry.set('name', player);
      this.scene.start('Narration');
    }
  }
}