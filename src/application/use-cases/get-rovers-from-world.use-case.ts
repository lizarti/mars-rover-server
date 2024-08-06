import { GetRoversFromWorldService } from '../../domain'

export class GetRoversFromWorldUseCase {
  constructor(private readonly getRoversFromWorldService: GetRoversFromWorldService) {}

  async execute(worldId: string) {
    const rovers = await this.getRoversFromWorldService.get(worldId)

    return rovers
  }
}
