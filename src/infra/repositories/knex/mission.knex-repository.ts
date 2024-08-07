import { Mission } from '../../../domain'
import { MissionRepository } from '../../../domain/repositories'
import { MissionEntity } from '../../database'
import { BaseKnexRepository } from './base.knex-repository'

export class MissionKnexRepository
  extends BaseKnexRepository<MissionEntity>
  implements MissionRepository
{
  async create(mission: Mission): Promise<Mission> {
    const res = await this.getTable()
      .insert({
        id: mission.id,
        rover_id: mission.roverId,
        start_position_x: mission.positionStart.x,
        start_position_y: mission.positionStart.y,
        end_position_x: mission.positionEnd.x,
        end_position_y: mission.positionEnd.y,
        start_orientation_x: mission.orientationStart.x,
        start_orientation_y: mission.orientationStart.y,
        end_orientation_x: mission.orientationEnd.x,
        end_orientation_y: mission.orientationEnd.y,
        instructions: mission.instructions,
        duration_in_seconds: mission.durationInSeconds
      })
      .returning('*')

    const createdMission = MissionEntity.toDomain(res[0])
    return createdMission
  }

  async findByRoverId(roverId: string): Promise<Mission[]> {
    const missionsEntities = await this.getTable().where('rover_id', roverId)
    const missions = missionsEntities.map((missionEntity) => MissionEntity.toDomain(missionEntity))

    return missions
  }
}
