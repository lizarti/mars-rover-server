import { Mission, Vector } from '../../../domain'
import { BaseEntity } from './base.entity'

export class MissionEntity extends BaseEntity {
  rover_id: string
  instructions: string
  start_position_x: number
  start_position_y: number
  start_orientation_x: number
  start_orientation_y: number
  end_position_x: number
  end_position_y: number
  end_orientation_x: number
  end_orientation_y: number
  duration_in_seconds: number

  static toDomain(entity: MissionEntity): Mission {
    const mission = new Mission()
    mission.id = entity.id
    mission.instructions = entity.instructions
    mission.positionStart = new Vector(entity.start_position_x, entity.start_position_y)
    mission.positionEnd = new Vector(entity.end_position_x, entity.end_position_y)
    mission.orientationStart = new Vector(entity.start_orientation_x, entity.start_orientation_y)
    mission.orientationEnd = new Vector(entity.end_orientation_x, entity.end_orientation_y)
    mission.instructions = entity.instructions
    mission.durationInSeconds = entity.duration_in_seconds

    return mission
  }
}
