import { Position } from './position.dto'

export class GetRoverByIdResponseDto {
  id: string
  position: Position
  orientation: Position
}