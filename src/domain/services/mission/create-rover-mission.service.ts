import { MissionRepository, RoverRepository } from '../../../infra'
import { generateUuid } from '../../../utils/uuid.util'
import { Mission, Rover } from '../../models'

export class CreateRoverMissionService {
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

    const duration = this.processInstructions(rover, missionInstructions)
    mission.durationInSeconds = duration

    mission.positionEnd = rover.position.clone()
    mission.orientationEnd = rover.orientation.clone()

    mission.roverId = rover.id

    const createdMission = await this.missionRepository.create(mission)

    await this.updateRover(rover)
    return createdMission
  }

  private processInstructions(rover: Rover, missionInstructions: string): number {
    const instructions = missionInstructions.split('')
    instructions.forEach((instruction) => {
      switch (instruction) {
        case 'L':
          rover.turnAnticlockwise()
          break
        case 'R':
          rover.turnClockwise()
          break
        case 'M':
          rover.moveForward()
          break
        default:
          throw new Error('Invalid instruction')
      }
    })

    const duration = instructions.length * 500
    return duration
  }

  private async updateRover(rover: Rover): Promise<Rover> {
    return this.roverRepository.updatePosition(rover)
  }
}
