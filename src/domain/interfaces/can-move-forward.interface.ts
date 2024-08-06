import { type HasPosition } from './has-position.interface'
import { type HasOrientation } from './has-orientation.interface'

export interface CanMoveForward extends HasPosition, HasOrientation {
  moveForward(length: number): void
}
