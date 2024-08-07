import { WorldNotFoundException } from '../../exceptions'
import { World } from '../../models'
import { RoverRepository, WorldRepository } from '../../repositories'

export class GetWorldByIdService {

  constructor(public readonly worldRepository: WorldRepository,
    public readonly roverRepository: RoverRepository
  ) {
    this.worldRepository = worldRepository
  }

  public async get(id: string): Promise<World> {
    const world = await this.worldRepository.findById(id)
    if (!world) {
      throw new WorldNotFoundException()
    }

    const rovers = await this.roverRepository.findByWorldId(id)
    world.setRovers(rovers)

    return world
  }
}
