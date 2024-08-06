import {
  HasOrientation,
  HasPosition,
  type CanMoveForward,
  type CanTurn,
  type HasId
} from '../interfaces'
import { Vector } from './vector.model'
import { CardinalOrientationEnum } from '../enums'
import { World } from './world.model'
import { Mission } from './mission.model'

export class Rover implements CanMoveForward, CanTurn, HasId, HasOrientation, HasPosition {
  id: string
  worldId: string
  private world: World
  missions: Mission[] = []

  private initialPosition: Vector
  private initialOrientation: Vector
  position: Vector
  orientation: Vector

  constructor(x: number, y: number, orientation: Vector = new Vector(0, 1)) {
    this.position = new Vector(x, y)
    this.initialPosition = this.position
    this.initialOrientation = orientation
    this.orientation = orientation
  }

  turnClockwise(): void {
    this.orientation = this.orientation.turnClockwise()
  }
  turnAnticlockwise(): void {
    this.orientation = this.orientation.turnAnticlockwise()
  }

  moveForward(step = 1): void {
    const newPosition = this.position.add(this.orientation.multiply(step))
    console.log(
      `[Rover] Moving from (${this.position.x}, ${this.position.y}) to (${newPosition.x}, ${newPosition.y})`
    )
    this.position = newPosition
  }

  getInitialPosition(): Vector {
    return this.initialPosition
  }

  getInitialOrientation(): Vector {
    return this.initialOrientation
  }

  getWorld(): World {
    return this.world
  }

  setWorld(world: World): Rover {
    this.world = world
    this.worldId = world.id
    return this
  }

  get cardinalOrientation(): CardinalOrientationEnum {
    return this.orientation.toCardinalOrientation()
  }

  toJSON() {
    return {
      id: this.id,
      world: this.world,
      position: this.position,
      orientation: this.orientation,
      missions: this.missions,
      cardinalOrientation: this.cardinalOrientation
    }
  }
}
