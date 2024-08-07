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
        width: world.size.width,
        height: world.size.height
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

  async getAll(): Promise<World[]> {
    const worlds = await this.getTable().leftJoin('rovers', 'worlds.id', 'rovers.world_id').select('worlds.*').count('rovers.id as rovers_count').groupBy('worlds.id') as WorldEntity[]

    return worlds.map(WorldEntity.toDomain)
  }

  async delete(worldId: string): Promise<void> {
    await this.getTable().where('id', worldId).delete()
  }
}
