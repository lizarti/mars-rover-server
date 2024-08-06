import { GetRoverByIdService, GetWorldByIdService, Rover } from '../../domain'
import { GetRoverWithWorldUseCase } from './get-rover-with-world.use-case'

describe('GetRoverWithWorldUseCase', () => {
  let getRoverByIdService: GetRoverByIdService
  let getWorldByIdService: GetWorldByIdService
  let getRoverWithWorldUseCase: GetRoverWithWorldUseCase

  beforeEach(() => {
    getRoverByIdService = {
      get: jest.fn().mockResolvedValue({
        id: 'roverId',
        worldId: 'worldId',
        setWorld: jest.fn()
      } as unknown as Rover)
    } as unknown as GetRoverByIdService

    getWorldByIdService = {
      get: jest.fn().mockResolvedValue({ id: 'worldId' })
    } as unknown as GetWorldByIdService

    getRoverWithWorldUseCase = new GetRoverWithWorldUseCase(
      getRoverByIdService,
      getWorldByIdService
    )
  })

  it('should get the rover by id and set its world', async () => {
    const roverId = 'roverId'
    const expectedRover = {
      id: 'roverId',
      worldId: 'worldId'
    } as unknown as Rover

    await getRoverWithWorldUseCase.execute(roverId)

    expect(getRoverByIdService.get).toHaveBeenCalledWith(roverId)
    expect(getWorldByIdService.get).toHaveBeenCalledWith(expectedRover.worldId)
  })

  it('should return the rover', async () => {
    const roverId = 'roverId'
    const expectedRover = {
      id: 'roverId',
      worldId: 'worldId',
      setWorld: jest.fn()
    } as unknown as Rover

    const result = await getRoverWithWorldUseCase.execute(roverId)

    expect(result.id).toEqual(expectedRover.id)
  })
})
