import { Rover, World } from '../../models'
import { RoverRepository } from '../../repositories'

export class AddRoverService {
  constructor(private readonly roverRepository: RoverRepository) {}

  async add(world: World, rover: Rover): Promise<Rover> {
    rover.setWorld(world)
    const createdRover = await this.roverRepository.create(rover)
    return createdRover
  }
}
