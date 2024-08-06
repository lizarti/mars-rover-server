import { Vector } from '../domain'
import { Orientation } from '../types'

export function createVectorFromOrientation(orientation: Orientation): Vector {
  switch (orientation) {
    case Orientation.NORTH:
      return new Vector(0, 1)
    case Orientation.EAST:
      return new Vector(1, 0)
    case Orientation.SOUTH:
      return new Vector(0, -1)
    case Orientation.WEST:
      return new Vector(-1, 0)
  }
}
