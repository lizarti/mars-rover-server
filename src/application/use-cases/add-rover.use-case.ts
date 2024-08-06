import { AddRoverRequestDto } from '../../api'
import { AddRoverService, GetWorldByIdService, Rover, Vector, World } from '../../domain'
import { generateUuid } from '../../utils/uuid.util'

export class AddRoverUseCase {
  constructor(
    private readonly addRoverService: AddRoverService,
    private readonly getWorldByIdService: GetWorldByIdService
  ) {}

  async execute(worldId: string, addRoverRequestDto: AddRoverRequestDto): Promise<Rover> {
    const world = await this.getWorld(worldId)
    const rover = this.createRoverFromDto(addRoverRequestDto)
    const createdRover = await this.addRoverService.add(world, rover)
    return createdRover
  }

  private async getWorld(worldId: string): Promise<World> {
    const world = await this.getWorldByIdService.get(worldId)
    return world
  }

  private createRoverFromDto(addRoverRequestDto: AddRoverRequestDto): Rover {
    const orientation = new Vector(
      addRoverRequestDto.landingOrientationX,
      addRoverRequestDto.landingOrientationY
    )
    const rover = new Rover(
      addRoverRequestDto.landingPositionX,
      addRoverRequestDto.landingPositionY,
      orientation
    )
    rover.id = generateUuid()

    return rover
  }
}
