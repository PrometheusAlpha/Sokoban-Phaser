let player;
let cursors;
let layer;
let targetsCoveredByColor = {};
let boxesByColor = {};

import * as Colors from './consts/Color.js'
import {
  boxColorToTargetColor,
  targetColorToBoxColor
} from './utils/ColorUtils.js'
import {
  Direction
} from './consts/Direction.js'
import {
  offsetForDirection
} from './utils/TileUtils.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super('hello-world');
  }

  preload() {
    this.load.spritesheet('tiles', '../assets/sokoban_tilesheet@2.png', {
      frameWidth: 128,
      startFrame: 0,
    });

    cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    const level = [
      [99, 99, 100, 100, 100, 99, 99, 99, 99],
      [99, 99, 100, 51, 100, 99, 99, 99, 99],
      [99, 99, 100, 0, 100, 100, 100, 100, 99],
      [100, 100, 100, 8, 0, 7, 38, 100, 99],
      [100, 25, 0, 6, 52, 0, 100, 100, 99],
      [100, 100, 100, 100, 9, 100, 99, 99, 99],
      [99, 99, 99, 100, 64, 100, 99, 99, 99],
      [99, 99, 99, 100, 100, 100, 99, 99, 99],
      [99, 99, 99, 99, 99, 99, 99, 99, 99],
    ];

    const map = this.make.tilemap({
      data: level,
      tileWidth: 128,
      tileHeight: 128,
    });

    const tiles = map.addTilesetImage('tiles');
    layer = map.createLayer(0, tiles, 0, 0);

    player = layer.createFromTiles(52, 0, {
      key: 'tiles',
      frame: 52
    }).pop();
    player.setOrigin(0);

    this.createPlayerAnims();

    this.extractBoxes(layer)
  }

  update() {
    if (!cursors || !player) {
      return;
    }

    const justLeft = Phaser.Input.Keyboard.JustDown(cursors.left)
    const justRight = Phaser.Input.Keyboard.JustDown(cursors.right)
    const justUp = Phaser.Input.Keyboard.JustDown(cursors.up)
    const justDown = Phaser.Input.Keyboard.JustDown(cursors.down)

    if (justLeft) {
      const baseTween = {
        x: '-= 128',
        duration: 500
      }

      this.tweenMove(Direction['Left'], baseTween, () => {
        player.anims.play('left', true);
      })
    } else if (justRight) {
      const baseTween = {
        x: '+= 128',
        duration: 500
      }

      this.tweenMove(Direction['Right'], baseTween, () => {
        player.anims.play('right', true);
      })
    } else if (justUp) {
      const baseTween = {
        y: '-= 128',
        duration: 500
      }

      this.tweenMove(Direction['Up'], baseTween, () => {
        player.anims.play('up', true);
      })
    } else if (justDown) {
      const baseTween = {
        y: '+= 128',
        duration: 500
      }

      this.tweenMove(Direction['Down'], baseTween, () => {
        player.anims.play('down', true);
      })
    }
  }

  allTargetCovered() {
    const targetColors = Object.keys(targetsCoveredByColor)
    // console.log(targetColors)
    // console.log(targetsCoveredByColor)
    for (let i = 0; i < targetColors.length; ++i) {
      const targetColor = parseInt(targetColors[i]);
      const boxColor = targetColorToBoxColor(targetColor);
      if (!(boxColor in boxesByColor)) {
        continue;
      }

      const numBoxes = boxesByColor[boxColor].length
      const numCovered = targetsCoveredByColor[targetColor]
      // console.log(`${boxColor} ${numBoxes} ${numCovered}`)
      // console.log(boxesByColor[boxColor])

      if (numCovered !== numBoxes) {
        return false;
      }
    }
    return true;
  }

  extractBoxes(layer) {
    const boxColors = [
      Colors.BoxOrange,
      Colors.BoxRed,
      Colors.BoxBlue,
      Colors.BoxGreen,
      Colors.BoxGray
    ]

    boxColors.forEach(color => {
      boxesByColor[color] = layer.createFromTiles(color, 0, {
        key: 'tiles',
        frame: color
      }).map(box => box.setOrigin(0))

      const targetColor = boxColorToTargetColor(color);
      targetsCoveredByColor[targetColor] = 0
    })

  }

  // make player move and move the box as well
  tweenMove(direction, baseTween, onStart) {
    if (this.tweens.isTweening(player)) {
      return
    }

    const x = player.x
    const y = player.y
    const nextOffset = offsetForDirection(direction)
    const ox = x + nextOffset.x
    const oy = y + nextOffset.y

    const hasWall = this.hasWallAt(ox, oy)

    if (hasWall) {
      const key = player.anims.currentAnim.key
      console.log(key)
      player.anims.play(`${key}`, true);
      return
    }

    const boxData = this.getBoxDataAt(ox, oy)
    if (boxData) {
      const nx = nextOffset.x
      const ny = nextOffset.y

      const box = boxData.box

      const nextBoxData = this.getBoxDataAt(box.x + nx, box.y + ny)
      const nextWallData = this.hasWallAt(box.x + nx, box.y + ny)

      if (nextBoxData || nextWallData) {
        return;
      }

      const boxColor = boxData.color
      const targetColor = boxColorToTargetColor(boxColor)

      const coveredTarget = this.hasTargetAt(box.x, box.y, targetColor)
      if (coveredTarget) {
        this.changeTargetCoveredCountForCount(targetColor, -1)
      }

      this.tweens.add(Object.assign(
        baseTween, {
          targets: box,
          onComplete: () => {
            const coveredTarget = this.hasTargetAt(box.x, box.y, targetColor);
            if (coveredTarget) {
              this.changeTargetCoveredCountForCount(targetColor, 1);
            }

            console.log(this.allTargetCovered());
            console.log(targetsCoveredByColor);
          }
        }
      ))
    }
    this.tweens.add(Object.assign(
      baseTween, {
        targets: player,
        onComplete: this.stopPlayerAnimation,
        onCompleteScope: this,
        onStart
      }
    ))
  }

  // used when player finishes moving
  stopPlayerAnimation() {
    if (!player) {
      return
    }
    const key = player.anims.currentAnim.key
    if (!key.startsWith('idle')) {
      player.anims.play(`idle-${key}`, true);
    }
  }


  changeTargetCoveredCountForCount(color, change) {
    if (!(color in targetsCoveredByColor)) {
      targetsCoveredByColor[color] = 0
    }

    targetsCoveredByColor[color] += change
  }

  // check if the box is in position (x, y)
  getBoxDataAt(x, y) {
    const keys = Object.keys(boxesByColor)
    for (let i = 0; i < keys.length; ++i) {
      const color = keys[i]
      const box = boxesByColor[color].find(box => {
        const rect = box.getBounds()
        return rect.contains(x, y)
      })

      if (!box) continue
      return {
        box,
        color: parseInt(color)
      }
    }

    return undefined
  }

  // check if the wall box is in position (x, y)
  hasWallAt(x, y) {
    if (!layer) return false
    const tile = layer.getTileAtWorldXY(x, y)
    if (!tile) return false
    return tile.index === 100
  }

  // check the target in tileIndex
  hasTargetAt(x, y, tileIndex) {
    if (!layer) return false
    const tile = layer.getTileAtWorldXY(x, y)
    if (!tile) return false
    console.log(tile.index)
    return tile.index === tileIndex
  }

  createPlayerAnims() {
    this.anims.create({
      key: 'idle-down',
      frames: [{
        key: 'tiles',
        frame: 52
      }]
    });

    this.anims.create({
      key: 'idle-left',
      frames: [{
        key: 'tiles',
        frame: 81
      }]
    });

    this.anims.create({
      key: 'idle-right',
      frames: [{
        key: 'tiles',
        frame: 78
      }]
    });

    this.anims.create({
      key: 'idle-up',
      frames: [{
        key: 'tiles',
        frame: 55
      }]
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('tiles', {
        start: 81,
        end: 83,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('tiles', {
        start: 78,
        end: 80,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('tiles', {
        start: 55,
        end: 57,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('tiles', {
        start: 52,
        end: 54,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}