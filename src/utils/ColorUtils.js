import * as Color from '../consts/Color.js'

const boxColorToTargetColor = (boxColor) => {
  switch (boxColor) {
    default:

    case Color.BoxRed:
      return Color.TargetRed

    case Color.BoxGray:
      return Color.TargetGray

    case Color.BoxGreen:
      return Color.TargetGreen

    case Color.BoxBlue:
      return Color.TargetBlue

    case Color.BoxOrange:
      return Color.TargetOrange
  }
}

const targetColorToBoxColor = (targetColor) => {
  switch (targetColor) {
    default:

    case Color.TargetRed:
      return Color.BoxRed

    case Color.TargetGray:
      return Color.BoxGray

    case Color.TargetGreen:
      return Color.BoxGreen

    case Color.TargetBlue:
      return Color.BoxBlue

    case Color.TargetOrange:
      return Color.BoxOrange
  }
}

export {
  boxColorToTargetColor,
  targetColorToBoxColor
}