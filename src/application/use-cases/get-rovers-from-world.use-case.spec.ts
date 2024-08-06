import { GetRoversFromWorldService, Rover } from '../../domain'
import { GetRoversFromWorldUseCase } from './get-rovers-from-world.use-case'

describe('GetRoversFromWorldUseCase', () => {
  let getRoversFromWorldService: GetRoversFromWorldService
  let getRoversFromWorldUseCase: GetRoversFromWorldUseCase

  beforeEach(() => {
    getRoversFromWorldService = {
      get: jest.fn().mockResolvedValue([
        {
          id: 'roverId',
          worldId: 'worldId'
        } as unknown as Rover,
        {
          id: 'roverId2',
          worldId: 'worldId'
        } as unknown as Rover
      ])
    } as unknown as GetRoversFromWorldService

    getRoversFromWorldUseCase = new GetRoversFromWorldUseCase(getRoversFromWorldService)
  })

  it('should return an array of rovers if rovers exist in the world', async () => {
    const worldId = 'worldId'

    const result = await getRoversFromWorldUseCase.execute('worldId')

    expect(getRoversFromWorldService.get).toHaveBeenCalledWith(worldId)
    expect(result).toEqual([
      {
        id: 'roverId',
        worldId: 'worldId'
      } as unknown as Rover,
      {
        id: 'roverId2',
        worldId: 'worldId'
      } as unknown as Rover
    ])
  })
})
