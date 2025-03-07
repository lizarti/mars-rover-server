import { World } from '../../models'
import { WorldRepository } from '../../repositories'

export class CreateWorldService {
  constructor(private readonly worldRepository: WorldRepository) {}

  async createWorld(world: World): Promise<World> {
    return this.worldRepository.create(world)
  }
}
