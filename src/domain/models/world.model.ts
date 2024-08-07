import { HasId } from '../interfaces'
import type { Rover } from './rover.model'

export type WorldSize = {
  width: number
  height: number
}
export class World implements HasId {
  id: string
  name: string
  private roversCount: number = 0

  private rovers: Rover[] = []

  constructor(public size: WorldSize) {}

  getRovers(): Rover[] {
    return this.rovers
  }

  setRovers(rovers: Rover[]): void {
    this.rovers = rovers
    this.rovers.forEach((rover) => rover.setWorld(this))
    this.roversCount = this.rovers.length
  }

  setRoversCount(count: number): void {
    this.roversCount = count
  }

  getRoversCount(): number {
    return this.roversCount
  }
}
