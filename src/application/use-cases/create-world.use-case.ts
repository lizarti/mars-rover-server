import { CreateWorldRequestDto, CreateWorldResponseDto } from '../../api'
import { CreateWorldService, World } from '../../domain'
import { generateUuid } from '../../utils/uuid.util'

export class CreateWorldUseCase {
  constructor(private readonly createWorldService: CreateWorldService) {}

  async execute(createWorldRequestDto: CreateWorldRequestDto): Promise<CreateWorldResponseDto> {
    const creatingWorld = this.createWorldFromDto(createWorldRequestDto)
    const world = await this.createWorldService.createWorld(creatingWorld)

    const responseDto = this.mapToResponseDto(world)
    return responseDto
  }

  private createWorldFromDto(createWorldRequestDto: CreateWorldRequestDto): World {
    const world = new World({
      width: createWorldRequestDto.width,
      height: createWorldRequestDto.height
    })
    world.id = generateUuid()
    return world
  }
  private mapToResponseDto(world: World): CreateWorldResponseDto {
    return new CreateWorldResponseDto(world.id, world.name, world.size.width, world.size.height)
  }
}
