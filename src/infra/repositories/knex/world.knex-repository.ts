import { World } from '../../../domain'
import { WorldRepository } from '../../../domain/repositories'
import { generateRandomName } from '../../../utils/random.util'
import { WorldEntity } from '../../database/entities'
import { BaseKnexRepository } from './base.knex-repository'

export class WorldKnexRepository
  extends BaseKnexRepository<WorldEntity>
  implements WorldRepository
{
  async create(world: World): Promise<World> {
    const res = await this.getTable()
      .insert({
        id: world.id,
        name: generateRandomName(),
        size_x: world.size.width,
        size_y: world.size.height
      })
      .returning('*')

    const createdWorld = WorldEntity.toDomain(res[0])

    return createdWorld
  }

  async findById(id: string): Promise<World | undefined> {
    const roverEntity = await this.getTable().where('id', id).first()
    if (roverEntity) {
      return WorldEntity.toDomain(roverEntity)
    }
  }
}
