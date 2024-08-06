import { CreateMissionRequestDto } from '../../api'
import { CreateRoverMissionService, GetRoverByIdService, Mission, Rover } from '../../domain'
import { CreateMissionUseCase } from './create-mission.use-case'

describe.only('CreateMissionUseCase', () => {
  let createMissionService: CreateRoverMissionService
  let createMissionUseCase: CreateMissionUseCase
  let getRoverByIdService: GetRoverByIdService

  beforeEach(() => {
    createMissionService = {
      createMission: jest.fn().mockResolvedValue({
        id: 'mission1',
        roverId: 'rover1'
      })
    } as unknown as CreateRoverMissionService

    getRoverByIdService = {
      get: jest.fn().mockResolvedValue({
        id: 'roverId',
        worldId: 'worldId',
        setWorld: jest.fn()
      } as unknown as Rover)
    } as unknown as GetRoverByIdService

    createMissionUseCase = new CreateMissionUseCase(createMissionService, getRoverByIdService)
  })

  describe('execute', () => {
    it('should create a mission successfully', async () => {
      const roverId = 'rover1'
      const createMissionRequestDto: CreateMissionRequestDto = {
        instructions: 'RMMMRRLLLM'
      }
      const expectedMission = {
        id: 'mission1',
        roverId: roverId
      } as Mission

      const createdMission = await createMissionUseCase.execute(roverId, createMissionRequestDto)

      expect(createdMission).toEqual(expectedMission)
      expect(getRoverByIdService.get).toHaveBeenCalledWith(roverId)
      expect(createMissionService.createMission).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'roverId'
        }),
        createMissionRequestDto.instructions
      )
    })
  })
})
