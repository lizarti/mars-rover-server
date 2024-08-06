import { Rover } from '../../../domain/models'
import { RoverEntity } from '../../database/entities'
import { RoverRepository } from '../rover.repository'
import { BaseKnexRepository } from './base.knex-repository'

export class RoverKnexRepository
  extends BaseKnexRepository<RoverEntity>
  implements RoverRepository
{
  async create(rover: Rover): Promise<Rover> {
    const res = await this.getTable()
      .insert({
        id: rover.id,
        world_id: rover.worldId,
        current_orientation_x: rover.orientation.x,
        current_orientation_y: rover.orientation.y,
        current_position_x: rover.position.x,
        current_position_y: rover.position.y,
        landed_orientation_x: rover.getInitialOrientation().x,
        landed_orientation_y: rover.getInitialOrientation().y,
        landed_position_x: rover.getInitialPosition().x,
        landed_position_y: rover.getInitialPosition().y
      })
      .returning('*')

    const createdRover = RoverEntity.toDomain(res[0])

    return createdRover
  }

  async findById(id: string): Promise<Rover | undefined> {
    const roverEntity = await this.getTable().where('id', id).first()
    if (roverEntity) {
      return RoverEntity.toDomain(roverEntity)
    }
  }

  async findByWorldId(worldId: string): Promise<Rover[]> {
    const roverEntities = await this.getTable().where('world_id', worldId)
    return roverEntities.map((roverEntity) => RoverEntity.toDomain(roverEntity))
  }

  async updatePosition(rover: Rover): Promise<Rover> {
    const res = await this.getTable()
      .where('id', rover.id)
      .update({
        current_orientation_x: rover.orientation.x,
        current_orientation_y: rover.orientation.y,
        current_position_x: rover.position.x,
        current_position_y: rover.position.y
      })
      .returning('*')

    return RoverEntity.toDomain(res[0])
  }
}
