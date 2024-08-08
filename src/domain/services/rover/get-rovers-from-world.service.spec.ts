import { GetRoversFromWorldService } from './get-rovers-from-world.service'
import { Rover } from '../../models'
import { RoverRepository } from '../../repositories'

describe('GetRoversFromWorldService', () => {
  let roverRepository: RoverRepository
  let getRoversFromWorldService: GetRoversFromWorldService

  beforeEach(() => {
    roverRepository = {
      findByWorldId: jest.fn().mockResolvedValue([
        { id: 'roverId1', worldId: 'worldId' },
        { id: 'roverId2', worldId: 'worldId' }
      ] as Rover[])
    } as unknown as RoverRepository
    getRoversFromWorldService = new GetRoversFromWorldService(roverRepository)
  })

  it('should get rovers from the specified world', async () => {
    const worldId = 'worldId'

    const result = await getRoversFromWorldService.get(worldId)

    expect(roverRepository.findByWorldId).toHaveBeenCalledWith(worldId)
    expect(result).toEqual([
      { id: 'roverId1', worldId: 'worldId' },
      { id: 'roverId2', worldId: 'worldId' }
    ])
  })
})
