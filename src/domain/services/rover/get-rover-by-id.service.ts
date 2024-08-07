import { RoverNotFoundException } from '../../exceptions'
import { Rover } from '../../models'
import { MissionRepository, RoverRepository, WorldRepository } from '../../repositories'

export class GetRoverByIdService {
  constructor(
    private readonly roverRepository: RoverRepository,
    private readonly worldRepository: WorldRepository,
    private readonly missionRepository: MissionRepository
  ) {
    this.roverRepository = roverRepository
    this.missionRepository = missionRepository
  }

  public async get(id: string): Promise<Rover> {
    const rover = await this.roverRepository.findById(id)
    if (!rover) {
      throw new RoverNotFoundException()
    }

    const world = await this.worldRepository.findById(rover.worldId)
    if (world) {
      rover.setWorld(world)
    }

    const missions = await this.missionRepository.findByRoverId(id)
    rover.missions = missions

    return rover
  }
}
