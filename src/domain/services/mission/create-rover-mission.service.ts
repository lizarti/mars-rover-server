import { MissionRepository, RoverRepository } from '../../../infra'
import { generateUuid } from '../../../utils/uuid.util'
import { Mission, Rover } from '../../models'
import { ProcessMissionInstructionsService } from './process-mission-instructions.service'

export class CreateRoverMissionService {
  private readonly processMissionInstructionsService = new ProcessMissionInstructionsService()
  constructor(
    private readonly missionRepository: MissionRepository,
    private readonly roverRepository: RoverRepository
  ) {}

  async createMission(rover: Rover, missionInstructions: string): Promise<Mission> {
    const mission = new Mission()
    mission.id = generateUuid()
    mission.instructions = missionInstructions
    mission.positionStart = rover.position.clone()
    mission.orientationStart = rover.orientation.clone()

    const duration = this.processMissionInstructionsService.processInstructions(
      rover,
      missionInstructions
    )
    mission.durationInSeconds = duration

    mission.positionEnd = rover.position.clone()
    mission.orientationEnd = rover.orientation.clone()

    mission.roverId = rover.id

    const createdMission = await this.missionRepository.create(mission)

    await this.updateRover(rover)
    return createdMission
  }

  private async updateRover(rover: Rover): Promise<Rover> {
    return this.roverRepository.updatePosition(rover)
  }
}
