import { Rover } from '../../models'
import { RoverRepository } from '../../repositories'

export class GetRoversFromWorldService {
  constructor(private readonly roverRepository: RoverRepository) {}

  async get(worldId: string): Promise<Rover[]> {
    const rovers = await this.roverRepository.findByWorldId(worldId)

    return rovers
  }
}
