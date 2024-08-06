import { CreateWorldRequestDto } from '../../api'
import { CreateWorldService, World } from '../../domain'
import { CreateWorldUseCase } from './create-world.use-case'

describe('CreateWorldUseCase', () => {
  let createWorldService: CreateWorldService
  let createWorldUseCase: CreateWorldUseCase

  beforeEach(() => {
    createWorldService = {
      createWorld: jest.fn().mockResolvedValue({
        id: 'worldId',
        size: { width: 10, height: 10 }
      } as World)
    } as unknown as CreateWorldService
    createWorldUseCase = new CreateWorldUseCase(createWorldService)
  })

  it('should create a new world', async () => {
    const createWorldRequestDto: CreateWorldRequestDto = {
      width: 10,
      height: 10
    }

    const result = await createWorldUseCase.execute(createWorldRequestDto)

    expect(createWorldService.createWorld).toHaveBeenCalledWith(
      expect.objectContaining({
        size: {
          width: createWorldRequestDto.width,
          height: createWorldRequestDto.height
        }
      })
    )
    expect(result).toEqual(
      expect.objectContaining({
        id: 'worldId',
        size: {
          width: createWorldRequestDto.width,
          height: createWorldRequestDto.height
        }
      })
    )
  })
})
