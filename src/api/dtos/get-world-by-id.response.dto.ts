import { Position } from './position.dto'

export type GetWorldByIdResponseSizeDto = {
  height: number
  width: number
}

export type GetWorldByIdResponseRoverDto = {
  id: string
  position: Position
  orientation: Position
}

export class GetWorldByIdResponseDto {
  constructor(public readonly id: string, public readonly name: string, public readonly createdAt: string, public readonly size :GetWorldByIdResponseSizeDto, public readonly rovers: GetWorldByIdResponseRoverDto[]) {}
}