import { RoverRepository } from '../../../infra/repositories'
import { Rover } from '../../models'

export class GetRoversFromWorldService {
  constructor(private readonly roverRepository: RoverRepository) {}

  async get(worldId: string): Promise<Rover[]> {
    const rovers = await this.roverRepository.findByWorldId(worldId)

    return rovers
  }
}
