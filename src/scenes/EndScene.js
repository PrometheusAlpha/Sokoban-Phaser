export default class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'EndScene'
    });
  }
  preload() {}
  create() {
    let data = JSON.parse(localStorage.getItem('turns'));
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      this.add.text(
        400,
        400 + i * 50,
        data[i].name, {
          fontFamily: 'Arial',
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }
      );
      this.add.text(
        400 + 100,
        400 + i * 50,
        data[i].level, {
          fontFamily: 'Arial',
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }
      );
      this.add.text(
        400 + 200,
        400 + i * 50,
        this.round(data[i].time), {
          fontFamily: 'Arial',
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }
      );
    }
  }

  update() {}

  round(num) {
    return Math.round(num * 100) / 100;
  }
}