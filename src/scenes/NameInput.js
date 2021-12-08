export default class NameInput extends Phaser.Scene {
  constructor() {
    super({
      key: 'NameInput'
    });
  }
  preload() {}

  create() {
    let player = prompt("Please enter your name", "Player") || "Player";
    this.registry.set('name', player);
    this.scene.start('level1');
  }
}