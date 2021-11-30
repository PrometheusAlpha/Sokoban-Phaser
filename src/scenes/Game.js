let player;
let cursors;
let boxes;

export default class Game extends Phaser.Scene {

  constructor() {
    super('hello-world')
  }

  //Nơi để load các assets trước khi chúng được sử dụng
  preload() {
    this.load.spritesheet('tiles', '../assets/sokoban_tilesheet@2.png', {
      frameWidth: 128,
      startFrame: 0
    })
  }

  //Nơi để thêm ra các đối tượng như image, text,... cần có trong Scene này
  create() {
    const level = [
      [99, 99, 100, 100, 100, 99, 99, 99, 99],
      [99, 99, 100, 51, 100, 99, 99, 99, 99],
      [99, 99, 100, 0, 100, 100, 100, 100, 99],
      [100, 100, 100, 8, 0, 8, 51, 100, 99],
      [100, 51, 0, 8, 52, 100, 100, 100, 99],
      [100, 100, 100, 100, 8, 100, 99, 99, 99],
      [99, 99, 99, 100, 51, 100, 99, 99, 99],
      [99, 99, 99, 100, 100, 100, 99, 99, 99],
      [99, 99, 99, 99, 99, 99, 99, 99, 99]
    ]

    const map = this.make.tilemap({
      data: level,
      tileWidth: 128,
      tileHeight: 128
    })

    const tiles = map.addTilesetImage('tiles')
    const layer = map.createLayer(0, tiles, 0, 0)

    player = layer.createFromTiles(52, 0, {
      key: 'tiles',
      frame: 52
    }).pop()
    player.setOrigin(0)

    this.createPlayerAnims()

    boxes = layer.createFromTiles(8, 0, {
      key: 'tiles',
      frame: 8
    }).map(box => box.setOrigin(0));
    console.log(boxes);

    cursors = this.input.keyboard.createCursorKeys();
  }

  getBoxAt(boxes, x, y) {
    return boxes.find(box => {
      const rect = box.getBounds()
      return rect.contains(x, y)
    })
  }

  update() {
    if (!cursors || !player) {
      return
    }

    const justLeft = Phaser.Input.Keyboard.JustDown(cursors.left)

    if (justLeft) {
      player.anims.play('left', true);
      const box = this.getBoxAt(boxes, player.x - 32, player.y);
      if (box) {

      }
    } else if (cursors.right.isDown) {
      player.anims.play('right', true);
    } else if (cursors.up.isDown) {
      player.anims.play('up', true);
    } else if (cursors.down.isDown) {
      player.anims.play('down', true);
    } else {
      player.anims.pause()
    }
  }

  createPlayerAnims() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('tiles', {
        start: 81,
        end: 83
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('tiles', {
        start: 78,
        end: 80
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('tiles', {
        start: 55,
        end: 57
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('tiles', {
        start: 52,
        end: 54
      }),
      frameRate: 10,
      repeat: -1
    });
  }
}