import { GetWorldByIdResponseDto, GetWorldByIdResponseRoverDto, GetWorldByIdResponseSizeDto } from '../../api';
import { GetWorldByIdService, World } from '../../domain';

export class GetWorldByIdUseCase {
  constructor(private readonly getWorldByIdService: GetWorldByIdService) {}

  async execute(worldId: string): Promise<GetWorldByIdResponseDto> {
    const world = await this.getWorldByIdService.get(worldId)
    const responseDto = this.mapToResponseDto(world)
    return responseDto
  }

  private mapToResponseDto(world: World): GetWorldByIdResponseDto {
    const getWorldByIdResponseSizeDto: GetWorldByIdResponseSizeDto = {
      height: world.size.height,
      width: world.size.width
    }
    const getWorldByIdResponseRoverDtos = world.getRovers().map((rover) => {
      const roverDto: GetWorldByIdResponseRoverDto = {
        id: rover.id,
        position: { x: rover.position.x, y: rover.position.y },
        orientation: { x: rover.orientation.x, y: rover.orientation.y }
      }
      return roverDto
    })
    return new GetWorldByIdResponseDto(world.id, world.name, world.createdAt.toISOString(), getWorldByIdResponseSizeDto, getWorldByIdResponseRoverDtos)
  }
}