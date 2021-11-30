import {
  Direction
} from '../consts/Direction.js'

const offsetForDirection = (direction) => {
  switch (direction) {
    case Direction['Left']:
      return {
        x: -64,
          y: 64
      }

      case Direction['Right']:
        return {
          x: 64 + 128,
            y: 64
        }

        case Direction['Up']:
          return {
            x: 64,
              y: -64
          }

          case Direction['Down']:
            return {
              x: 64,
                y: 64 + 128
            }

            default:
              return {
                x: 0,
                  y: 0
              }
  }
}

export {
  offsetForDirection
}