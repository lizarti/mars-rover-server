import { CreateMissionRequestDto } from '../../api'
import { CreateRoverMissionService, GetRoverByIdService, Mission, Rover } from '../../domain'

export class CreateMissionUseCase {
  constructor(
    private readonly createMissionService: CreateRoverMissionService,
    private readonly getRoverByIdService: GetRoverByIdService
  ) {}
  async execute(
    roverId: string,
    createMissionRequestDto: CreateMissionRequestDto
  ): Promise<Mission> {
    const rover = await this.getRover(roverId)
    const createdMission = await this.createMissionService.createMission(
      rover,
      createMissionRequestDto.instructions
    )
    return createdMission
  }

  private async getRover(roverId: string): Promise<Rover> {
    const rover = await this.getRoverByIdService.get(roverId)
    return rover
  }
}
