import { type HasOrientation } from './has-orientation.interface'

export interface CanTurn extends HasOrientation {
  turnClockwise(): void
  turnAnticlockwise(): void
}
