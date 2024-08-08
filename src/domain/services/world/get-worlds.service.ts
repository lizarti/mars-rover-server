import { GetWorldsResponseDto } from '../../../api';
import { World } from '../../models';
import { WorldRepository } from '../../repositories';

export class GetWorldsService {
  constructor(private readonly worldRepository: WorldRepository) {}

  async getAll(): Promise<GetWorldsResponseDto[]> {
    const worlds = await this.worldRepository.getAll();

    const responseDto = this.mapToResponseDto(worlds);
    return responseDto;
  }

  private mapToResponseDto(worlds: World[]): GetWorldsResponseDto[] {
    const worldsResponseDtos = worlds.map(world => {
      return new GetWorldsResponseDto(world.id, world.name, world.createdAt.toISOString(), { height: world.size.height, width: world.size.width }, world.getRoversCount());
    })

    return worldsResponseDtos;
  }
}