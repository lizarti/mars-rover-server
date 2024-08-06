import { InvalidMissionInstructionException } from '../../exceptions'
import { Rover, World } from '../../models'
import { ProcessMissionInstructionsService } from './process-mission-instructions.service'

describe('ProcessMissionInstructionsService', () => {
  let rover: Rover
  let service: ProcessMissionInstructionsService

  beforeEach(() => {
    rover = new Rover(0, 0).setWorld(new World({ width: 5, height: 5 }))
    service = new ProcessMissionInstructionsService()
  })

  it('should process mission instructions and return the correct duration', () => {
    const missionInstructions = 'MMRMMLMMM'
    const expectedDuration = 4500

    const duration = service.processInstructions(rover, missionInstructions)

    expect(duration).toBe(expectedDuration)
    expect(rover.position.x).toBe(2)
    expect(rover.position.y).toBe(5)
    expect(rover.cardinalOrientation).toBe('N')
  })

  it('should throw an error for invalid instruction', () => {
    const missionInstructions = 'LXMRMMR'

    expect(() => {
      service.processInstructions(rover, missionInstructions)
    }).toThrow(InvalidMissionInstructionException)
  })

  it('should throw an error for invalid movement', () => {
    const missionInstructions = 'MMLMM'

    expect(() => {
      service.processInstructions(rover, missionInstructions)
    }).toThrow('Rover cannot move forward to W from position (0, 2) and ')
  })

  it('should process empty mission instructions and return 0 duration', () => {
    const missionInstructions = ''
    const expectedDuration = 0

    const duration = service.processInstructions(rover, missionInstructions)

    expect(duration).toBe(expectedDuration)
  })
})
