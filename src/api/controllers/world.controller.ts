import { Request, Response } from 'express'
import { BadRequestResponse, NotFoundResponse, OkResponse, validateBody } from '../utils'
import { Controller } from './base.controller'
import { CreateWorldRequestDto } from '../dtos'
import { CreateWorldUseCase, DeleteWorldUseCase, GetWorldByIdUseCase, GetWorldsUseCase } from '../../application'
import { WorldNotFoundException } from '../../domain/exceptions'

export class WorldController extends Controller {
  constructor(
    private readonly getWorldsUseCase: GetWorldsUseCase,
    private readonly createWorldUseCase: CreateWorldUseCase,
    private readonly getWorldByIdUseCase: GetWorldByIdUseCase,
    private readonly deleteWorldUseCase: DeleteWorldUseCase
  ) {
    super()
  }

  async getWorlds(req: Request, res: Response) {
    try {
      const worlds = await this.getWorldsUseCase.execute()

      return new OkResponse(res, 'Worlds retrieved', worlds).send()
    } catch (error: any) {
      return new BadRequestResponse(res, error.message).send()
    }
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

  async getWorldById(req: Request, res: Response) {
    try {
      const worldId = req.params.id

      const world = await this.getWorldByIdUseCase.execute(worldId)

      return new OkResponse(res, 'World retrieved', world).send()
    } catch (error: any) {
      if (error instanceof WorldNotFoundException) {
        return new NotFoundResponse(res, error.message).send()
      }
      return new BadRequestResponse(res, error.message).send()
    }
  }

  async deleteWorldById(req: Request, res: Response) {
    try {
      const worldId = req.params.id

      await this.deleteWorldUseCase.execute(worldId)

      return new OkResponse(res, 'World deleted').send()
    } catch (error: any) {
      if (error instanceof WorldNotFoundException) {
        return new NotFoundResponse(res, error.message).send()
      }
      return new BadRequestResponse(res, error.message).send()
    }
  }

  initializeRoutes(): void {
    this.router.get('/api/worlds', (req, res) => this.getWorlds(req, res))
    this.router.post('/api/worlds', (req, res) => this.createWorld(req, res))
    this.router.get('/api/worlds/:id', (req, res) => this.getWorldById(req, res))
    this.router.delete('/api/worlds/:id', (req, res) => this.deleteWorldById(req, res))
  }
}
