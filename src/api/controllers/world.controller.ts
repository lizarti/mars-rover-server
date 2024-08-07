import { Request, Response } from 'express'
import { BadRequestResponse, OkResponse, validateBody } from '../utils'
import { Controller } from './base.controller'
import { CreateWorldRequestDto } from '../dtos'
import { CreateWorldUseCase } from '../../application'

export class WorldController extends Controller {
  constructor(private readonly createWorldUseCase: CreateWorldUseCase) {
    super()
  }
  async createWorld(req: Request, res: Response) {
    try {
      const createWorldRequestDto = await validateBody(CreateWorldRequestDto, req.body)

      const createdWorld = await this.createWorldUseCase.execute(createWorldRequestDto)

      return new OkResponse(res, 'World created', createdWorld).send()
    } catch (error: any) {
      return new BadRequestResponse(res, error.message).send()
    }
  }

  initializeRoutes(): void {
    this.router.post('/api/worlds', (req, res) => this.createWorld(req, res))
  }
}
