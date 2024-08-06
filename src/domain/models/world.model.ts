import { HasId } from '../interfaces'
import type { Rover } from './rover.model'

export type WorldSize = {
  width: number
  height: number
}
export class World implements HasId {
  id: string
  public rovers: Rover[] = []

  constructor(public size: WorldSize) {}

  addRover(rover: Rover): void {
    this.rovers.push(rover)
  }

  removeRover(rover: Rover): void {
    const index = this.rovers.indexOf(rover)
    console.log('index', index)
    if (index !== -1) {
      this.rovers.splice(index)
    }
  }

  sendAMeteor(): void {
    this.rovers = []
  }
}
