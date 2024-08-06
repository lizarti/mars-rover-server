import { RoverRepository } from '../../../infra/repositories'
import { MissionRepository } from '../../../infra/repositories'
import { RoverNotFoundException } from '../../exceptions'
import { Rover } from '../../models'

export class GetRoverByIdService {
  private roverRepository: RoverRepository
  private missionRepository: MissionRepository

  constructor(roverRepository: RoverRepository, missionRepository: MissionRepository) {
    this.roverRepository = roverRepository
    this.missionRepository = missionRepository
  }

  public async get(id: string): Promise<Rover> {
    const rover = await this.roverRepository.findById(id)
    if (!rover) {
      throw new RoverNotFoundException()
    }

    const missions = await this.missionRepository.findByRoverId(id)
    rover.missions = missions

    return rover
  }
}
