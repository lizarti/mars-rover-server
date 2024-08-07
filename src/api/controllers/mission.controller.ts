import { Request, Response } from 'express'
import { CreateMissionRequestDto } from '../dtos'
import { BadRequestResponse, OkResponse, validateBody } from '../utils'
import { Controller } from './base.controller'
import { CreateMissionUseCase } from '../../application'

export class MissionController extends Controller {
  constructor(private readonly createMissionUseCase: CreateMissionUseCase) {
    super()
  }

  async createMission(req: Request, res: Response) {
    const { roverId } = req.params

    try {
      const createMissionRequestDto = await validateBody(CreateMissionRequestDto, req.body)

      const createdMission = await this.createMissionUseCase.execute(
        roverId,
        createMissionRequestDto
      )

      return new OkResponse(res, 'Mission created', createdMission).send()
    } catch (error: any) {
      return new BadRequestResponse(res, error.message).send()
    }
  }

  initializeRoutes() {
    this.router.post('/api/worlds/:worldId/rovers/:roverId/missions', (req, res) =>
      this.createMission(req, res)
    )
  }
}
