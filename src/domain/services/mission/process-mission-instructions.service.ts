import { RoverActionEnum } from '../../enums'
import { InvalidMissionInstructionException, InvalidRoverMovementException } from '../../exceptions'
import { Rover, Vector } from '../../models'

export class ProcessMissionInstructionsService {
  processInstructions(rover: Rover, missionInstructions: string): number {
    const startPosition = rover.position.clone()
    const startOrientation = rover.orientation

    const instructions = missionInstructions.split('')
    instructions.forEach((instruction) => {
      switch (instruction) {
        case RoverActionEnum.LEFT:
          rover.turnAnticlockwise()
          break
        case RoverActionEnum.RIGHT:
          rover.turnClockwise()
          break
        case RoverActionEnum.MOVE:
          const canMoveForward = this.checkIfCanMoveForward(rover)
          if (!canMoveForward) {
            const exceptionMessage = `Rover cannot move forward to ${rover.cardinalOrientation} from position (${rover.position.x}, ${rover.position.y})`
            this.rollbackMission(rover, startPosition, startOrientation)
            throw new InvalidRoverMovementException(exceptionMessage)
          }
          rover.moveForward()
          break
        default:
          throw new InvalidMissionInstructionException(`Invalid instruction: ${instruction}`)
      }
    })

    const duration = instructions.length * 500
    return duration
  }

  private checkIfCanMoveForward(rover: Rover, step = 1): boolean {
    const { x, y } = rover.position
    const { width, height } = rover.getWorld().size

    if (rover.orientation.y === 1 && y + step > height - 1) {
      return false
    }

    if (rover.orientation.y === -1 && y - step < 0) {
      return false
    }

    if (rover.orientation.x === 1 && x + step > width - 1) {
      console.log('here')
      return false
    }

    if (rover.orientation.x === -1 && x - step < 0) {
      return false
    }

    return true
  }

  private rollbackMission(rover: Rover, startPosition: Vector, startOrientation: Vector): void {
    console.log(
      `[Rover] Rolling back mission to initial position (${startPosition.x}, ${startPosition.y}) and orientation (${startOrientation.x}, ${startOrientation.y})`
    )
    rover.position = startPosition
    rover.orientation = startOrientation
  }
}
