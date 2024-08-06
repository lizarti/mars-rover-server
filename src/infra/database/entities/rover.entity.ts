import { Rover, Vector } from '../../../domain'
import { WithTimestampsEntity } from './with-timestamps.entity'

export class RoverEntity extends WithTimestampsEntity {
  id: string
  world_id: string
  landed_position_x: number
  landed_position_y: number
  landed_orientation_x: number
  landed_orientation_y: number

  current_position_x: number
  current_position_y: number
  current_orientation_x: number
  current_orientation_y: number

  static toDomain(roverEntity: RoverEntity): Rover {
    const rover = new Rover(
      roverEntity.current_position_x,
      roverEntity.current_position_y,
      new Vector(roverEntity.current_orientation_x, roverEntity.current_orientation_y)
    )
    rover.id = roverEntity.id
    rover.worldId = roverEntity.world_id

    return rover
  }
}
