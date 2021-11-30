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

export {
    boxColorToTargetColor
}
