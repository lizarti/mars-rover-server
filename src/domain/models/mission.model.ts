import { HasId } from '../interfaces'
import { Rover } from './rover.model'
import { Vector } from './vector.model'

export class Mission implements HasId {
  id: string
  roverId: string
  rover: Rover
  positionStart: Vector
  positionEnd: Vector
  orientationStart: Vector
  orientationEnd: Vector
  instructions: string
  durationInSeconds: number
}
