import { AddRoverRequestDto } from '../../api'
import { AddRoverService, GetWorldByIdService, Rover } from '../../domain'
import { AddRoverUseCase } from './add-rover.use-case'

describe('AddRoverUseCase', () => {
  let addRoverService: AddRoverService
  let getWorldByIdService: GetWorldByIdService
  let addRoverUseCase: AddRoverUseCase

  beforeEach(() => {
    addRoverService = {
      add: jest.fn().mockResolvedValue({
        id: 'roverId',
        worldId: 'worldId',
        setWorld: jest.fn()
      } as unknown as Rover)
    } as unknown as AddRoverService
    getWorldByIdService = {
      get: jest.fn().mockResolvedValue({ id: 'worldId' })
    } as unknown as GetWorldByIdService
    addRoverUseCase = new AddRoverUseCase(addRoverService, getWorldByIdService)
  })

  it('should add a rover to the world', async () => {
    const worldId = 'worldId'
    const addRoverRequestDto: AddRoverRequestDto = {
      landingPositionX: 0,
      landingPositionY: 0,
      landingOrientationX: 1,
      landingOrientationY: 0
    }

    await addRoverUseCase.execute(worldId, addRoverRequestDto)

    expect(getWorldByIdService.get).toHaveBeenCalledWith(worldId)
    expect(addRoverService.add).toHaveBeenCalled()
  })

  it('should return the created rover', async () => {
    const worldId = 'worldId'
    const addRoverRequestDto: AddRoverRequestDto = {
      landingPositionX: 0,
      landingPositionY: 0,
      landingOrientationX: 1,
      landingOrientationY: 0
    }
    const expectedRover = {
      id: 'roverId',
      worldId: 'worldId',
      setWorld: jest.fn()
    } as unknown as Rover

    const result = await addRoverUseCase.execute(worldId, addRoverRequestDto)

    expect(result.id).toEqual(expectedRover.id)
  })
})
