export default class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'EndScene'
    });
  }
  preload() {}
  create() {
    let data = JSON.parse(localStorage.getItem('turns'));
    data.sort(function (a, b) {
      if (a.level === b.level) return a.time - b.time;
      return a.level > b.level;
    })
    console.log(data)
    this.add.text(
      250,
      400 + -1 * 50,
      'NAME', {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center'
      }
    );
    this.add.text(
      300 + 200,
      400 + -1 * 50,
      'LEVEL', {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center'
      }
    );
    this.add.text(
      400 + 400,
      400 + -1 * 50,
      'TIME', {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center'
      }
    );
    let n;
    if (data.length <= 5) {
      n = data.length
    }
    else n = 5
    for (let i = 0; i < n; i++) {
      this.add.text(
        250,
        400 + i * 50,
        data[i].name, {
          fontFamily: 'Arial',
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }
      );
      this.add.text(
        300 + 200,
        400 + i * 50,
        data[i].level, {
          fontFamily: 'Arial',
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }
      );
      this.add.text(
        400 + 400,
        400 + i * 50,
        this.round(data[i].time), {
          fontFamily: 'Arial',
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }
      );
    }
    let start = this.add
      .text(this.cameras.main.width / 2 - 200, this.cameras.main.height / 2 - 300, 'RESTART', {
        fontFamily: 'GoogleSans'
      }, 2, 1, 0)
      .setFontSize(100)
      .setInteractive()
      .once('pointerdown', this.startGame, this);
  }

  update() {}

  round(num) {
    return Math.round(num * 100) / 100;
  }

  startGame() {
    this.scene.start('NameInput');
  }
}
