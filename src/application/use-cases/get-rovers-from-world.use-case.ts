import { GetRoversFromWorldService, Rover } from '../../domain'

export class GetRoversFromWorldUseCase {
  constructor(private readonly getRoversFromWorldService: GetRoversFromWorldService) {}

  async execute(worldId: string): Promise<Rover[]> {
    const rovers = await this.getRoversFromWorldService.get(worldId)

    return rovers
  }
}
