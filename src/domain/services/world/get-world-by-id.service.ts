import { WorldNotFoundException } from '../../exceptions'
import { World } from '../../models'
import { WorldRepository } from '../../repositories'

export class GetWorldByIdService {
  private worldRepository: WorldRepository

  constructor(worldRepository: WorldRepository) {
    this.worldRepository = worldRepository
  }

  public async get(id: string): Promise<World> {
    const world = await this.worldRepository.findById(id)
    if (!world) {
      throw new WorldNotFoundException()
    }

    return world
  }
}
