export default class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'EndScene'
    });
  }
  preload() {}
  create() {
    this.add.text(
      400,
      200,
      'LEADERBOARD', {
        fontFamily: 'Arial',
        fontSize: '50px',
        color: '#ffffff',
        align: 'center',
        fontStyle: 'Bold',
      }
    );
    let data = JSON.parse(localStorage.getItem('turns'));
    data.sort(function (a, b) {
      if (a.level === b.level) return a.time - b.time;
      return a.level > b.level;
    })
    this.add.text(
      250,
      400 + -1 * 50,
      'NAME', {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center',
        fontStyle: 'Bold',
      }
    );
    this.add.text(
      300 + 200,
      400 + -1 * 50,
      'LEVEL', {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center',
        fontStyle: 'Bold',
      }
    );
    this.add.text(
      400 + 400,
      400 + -1 * 50,
      'TIME', {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#ffffff',
        align: 'center',
        fontStyle: 'Bold',
      }
    );
    let n;
    if (data.length <= 5) {
      n = data.length
    } else n = 5
    for (let i = 0; i < n; i++) {
      this.add.text(
        250,
        420 + i * 50,
        data[i].name, {
          fontFamily: 'Arial',
          fontSize: '32px',
          color: '#ffffff',
          align: 'center',
        }
      );
      this.add.text(
        300 + 200,
        420 + i * 50,
        data[i].level, {
          fontFamily: 'Arial',
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }
      );
      this.add.text(
        400 + 400,
        420 + i * 50,
        this.round(data[i].time), {
          fontFamily: 'Arial',
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }
      );
    }
    let start = this.add
      .text(this.cameras.main.width / 2 - 150, this.cameras.main.height / 2 + 300, '>> RESTART <<', {
        fontFamily: 'GoogleSans'
      }, 2, 1, 0)
      .setFontSize(50)
      .setInteractive()
      .once('pointerdown', this.startGame, this);
  }

  update() {}

  round(num) {
    return Math.round(num * 100) / 100;
  }

  startGame() {
    this.scene.start('Start');
  }
}
