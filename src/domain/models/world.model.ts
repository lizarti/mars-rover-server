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
}
