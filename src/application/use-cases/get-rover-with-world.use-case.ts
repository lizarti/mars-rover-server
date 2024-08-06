import { GetRoverByIdService, GetWorldByIdService, Rover } from '../../domain'

export class GetRoverWithWorldUseCase {
  constructor(
    private readonly getRoverByIdService: GetRoverByIdService,
    private readonly getWorldByIdService: GetWorldByIdService
  ) {}

  async execute(roverId: string): Promise<Rover> {
    const rover = await this.getRoverByIdService.get(roverId)
    const world = await this.getWorldByIdService.get(rover.worldId)
    rover.setWorld(world)

    return rover
  }
}
