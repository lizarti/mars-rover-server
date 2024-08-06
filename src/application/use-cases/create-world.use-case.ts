import { CreateWorldRequestDto } from '../../api'
import { CreateWorldService, World } from '../../domain'
import { generateUuid } from '../../utils/uuid.util'

export class CreateWorldUseCase {
  constructor(private readonly createWorldService: CreateWorldService) {}

  async execute(createWorldRequestDto: CreateWorldRequestDto): Promise<World> {
    const creatingWorld = this.createWorldFromDto(createWorldRequestDto)
    const world = await this.createWorldService.createWorld(creatingWorld)

    return world
  }

  private createWorldFromDto(createWorldRequestDto: CreateWorldRequestDto): World {
    const world = new World({
      width: createWorldRequestDto.width,
      height: createWorldRequestDto.height
    })
    world.id = generateUuid()
    return world
  }
}
