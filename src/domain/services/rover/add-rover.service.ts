import { InvalidRoverLandingPositionException } from '../../exceptions'
import { Rover, World } from '../../models'
import { RoverRepository } from '../../repositories'

export class AddRoverService {
  constructor(private readonly roverRepository: RoverRepository) {}

  async add(world: World, rover: Rover): Promise<Rover> {
    if (!this.checkIfRoverPositionIsInWorldBoundaries(rover, world)) {
      throw new InvalidRoverLandingPositionException(`Rover landing position is out of world boundaries. The position must be between (0, 0) and (${world.size.width}, ${world.size.height})`)
    }
    rover.setWorld(world)
    const createdRover = await this.roverRepository.create(rover)
    return createdRover
  }

  private checkIfRoverPositionIsInWorldBoundaries(rover: Rover, world: World): boolean {
    return (
      rover.position.x >= 0 &&
      rover.position.x <= world.size.width &&
      rover.position.y >= 0 &&
      rover.position.y <= world.size.height
    )
  }
}
