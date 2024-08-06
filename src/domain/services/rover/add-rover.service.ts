import { RoverRepository } from '../../../infra/repositories'
import { Rover, World } from '../../models'

export class AddRoverService {
  constructor(private readonly roverRepository: RoverRepository) {}

  async add(world: World, rover: Rover): Promise<Rover> {
    rover.worldId = world.id
    const createdRover = await this.roverRepository.create(rover)
    return createdRover
  }
}
