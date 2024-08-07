import { AddRoverRequestDto } from '../../api'
import { AddRoverResponseDto } from '../../api/dtos/add-rover-response.dto'
import { AddRoverService, GetWorldByIdService, Rover, Vector, World } from '../../domain'
import { generateUuid } from '../../utils/uuid.util'

export class AddRoverUseCase {
  constructor(
    private readonly addRoverService: AddRoverService,
    private readonly getWorldByIdService: GetWorldByIdService
  ) {}

  async execute(worldId: string, addRoverRequestDto: AddRoverRequestDto): Promise<AddRoverResponseDto> {
    const world = await this.getWorld(worldId)
    const rover = this.createRoverFromDto(addRoverRequestDto)
    const createdRover = await this.addRoverService.add(world, rover)

    const responseDto = this.mapToResponseDto(createdRover)
    return responseDto
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

  private mapToResponseDto(rover: Rover): AddRoverResponseDto {
    return {
      id: rover.id,
      position: {
        x: rover.position.x,
        y: rover.position.y
      },
      orientation: {
        x: rover.orientation.x,
        y: rover.orientation.y
      }
    }
  }
}
