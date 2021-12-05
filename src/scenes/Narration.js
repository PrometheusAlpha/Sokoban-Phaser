export default class Narration extends Phaser.Scene {
  text = "Bước chân đến sứ sở Hola đầy nắng và gió, luôn có những thách thức và khó khăn cản trở người anh hùng đạt tới những đỉnh cao, những ước mơ của bản thân.\n" +
    "Đỉnh cao mà người người mơ ước đó chính là danh hiệu Cóc Vàng quý giá !!\nBạn không ngại khó khăn !\nBạn là con người đầy cố gắng !\nHãy nhập vai, đạp bay tất cả chướng ngại vật để có thể đạt lấy danh hiệu cóc vàng cho riêng mình !!\nSẵn sàng !!!!"
  constructor() {
    super({
      key: 'Narration'
    });
    this.i = 0;
    this.count = 0;
  }

  preload() {}

  create() {
    this.hsv = Phaser.Display.Color.HSVColorWheel();
    this.startNarration = this.add
      .text(100, 652, "", {
        fontFamily: 'Lora, serif'
      }, 0).setWordWrapWidth(900)
      .setFontSize(30)
  }


  update() {
    const top = this.hsv[this.i].color;
    const bottom = this.hsv[359 - this.i].color;

    this.startNarration.setTint(top, top, bottom, bottom);

    this.i++;

    if (this.i === 360) {
      this.i = 0;
    }

    this.startNarration.setText(this.text.slice(0, this.count));
    this.count++;
    if (this.count === this.text.length) {
      setTimeout(() => {
        this.scene.start('level1');
      }, 2000);
    }
  }
}