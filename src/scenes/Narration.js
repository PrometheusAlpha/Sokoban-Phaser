export default class Narration extends Phaser.Scene {
  text = `Vào thế kỉ XXX nơi mà khoa học công nghệ tân tiến được áp dụng vào hầu hết các vấn đề trong cuộc sống, ranh giới giữa nhân tính và máy móc rất mong manh. Thế giới lúc này được chia làm hai tư tưởng lớn.
  Một bên cho rằng cơ thể con người chỉ là một vỏ bọc yếu ớt và họ cố gắng đưa trí tuệ và cảm xúc của con người vào những cỗ máy chiến đấu. Người cầm đầu tư tưởng là Javis rất đáng tiếc đã thất bại và có những hậu quả nghiêm trọng. Trên những thành phố, các con đường ngập tràn hình bóng của những cỗ máy điên loạn. Những thứ khổng lồ, đáng sợ mang sức mạnh hủy diệt và sẵn sàng tiêu diệt nhân loại.
  Tư tưởng còn lại là tư tưởng được đánh giá là tiến bộ và ôn hòa hơn khi chỉ sử dụng khoa học công nghệ để nâng cao giá trị của đời sống. Đối mặt với bờ vực diệt vong họ quyết định lập ra một đội quân kháng chiến, những người sử dụng trí tuệ của mình để chống lại đế chế của những cỗ máy hủy diệt.
  Có một thực tại đáng buồn nữa là do thời gian quá dài không phải sử dụng trí tuệ nên số lượng những cá nhân có bộ não ưu việt rất ít và không thể xây dựng những dự án lớn để cứu Trái Đất. Họ quyết định chế tạo cỗ máy thời gian quay trở về năm 2021 để tìm những nhân tài.
  Tại đây họ biết đến JS và quyết tâm giúp đỡ những con người xuất sắc nhất trở thành Cóc Vàng.
  Nhiệm vụ của bạn là hãy đưa những chiếc hộp vượt qua những thử thách và đạt được danh hiệu Cóc Vàng cao quý.
  Chúc may mắn !!`;
  constructor() {
    super({
      key: 'Narration'
    });
    this.i = 0;
    this.count = 0;
  }

  preload() {
    this.load.video('bg', 'assets/glitch.mp4', '', false, true);
  }

  create() {
    let vid = this.add.video(575, 300, 'bg');
    vid.play(true);

    this.startNarration = this.add
      .text(100, 652, "", {
        fontFamily: 'GoogleSans, sans-serif'
      }, 0).setWordWrapWidth(900)
      .setFontSize(30)
  }

  update() {
    const narration = this.text.split("\n");

    this.startNarration.setText(narration[this.i].slice(0, this.count));
    this.count++;

    if (this.count === narration[this.i].length) {
      setTimeout(() => {
        this.i++;
        this.startNarration.setText("");
        this.count = 0;
        if (this.i === narration.length) {
          this.scene.start('level1');
        }
      }, Math.max(this.count * 7, 2000));
    }
  }
}