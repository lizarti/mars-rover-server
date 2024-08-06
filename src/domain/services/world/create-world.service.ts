import { WorldRepository } from '../../../infra'
import { World } from '../../models'

export class CreateWorldService {
  constructor(private readonly worldRepository: WorldRepository) {}

  async createWorld(world: World): Promise<World> {
    return this.worldRepository.create(world)
  }
}
