import { Request, Response } from 'express'
import { BadRequestResponse, OkResponse, validateBody } from '../utils'
import { Controller } from './base.controller'
import {
  AddRoverUseCase,
  GetRoversFromWorldUseCase,
  GetRoverWithWorldUseCase
} from '../../application'
import { AddRoverRequestDto } from '../dtos'

export class RoverController extends Controller {
  constructor(
    private readonly addRoverUseCase: AddRoverUseCase,
    private readonly getRoverWithWorldUseCase: GetRoverWithWorldUseCase,
    private readonly getRoversFromWorldUseCase: GetRoversFromWorldUseCase
  ) {
    super()
  }

  async getRovers(req: Request, res: Response) {
    const { worldId } = req.params

    try {
      const rovers = await this.getRoversFromWorldUseCase.execute(worldId)

      return new OkResponse(res, 'Rovers retrieved', rovers).send()
    } catch (error: any) {
      return new BadRequestResponse(res, error.message).send()
    }
  }

  async getRoverById(req: Request, res: Response) {
    const { roverId } = req.params

    try {
      const rover = await this.getRoverWithWorldUseCase.execute(roverId)

      return new OkResponse(res, 'Rover retrieved', rover).send()
    } catch (error: any) {
      return new BadRequestResponse(res, error.message).send()
    }
  }

  async createRover(req: Request, res: Response) {
    const { worldId } = req.params

    try {
      const addRoverRequestDto = await validateBody(AddRoverRequestDto, req.body)

      const createdRover = await this.addRoverUseCase.execute(worldId, addRoverRequestDto)

      return new OkResponse(res, 'Rover created', createdRover).send()
    } catch (error: any) {
      return new BadRequestResponse(res, error.message).send()
    }
  }

  initializeRoutes(): void {
    this.router.get('/worlds/:worldId/rovers', (req, res) => this.getRovers(req, res))
    this.router.get('/worlds/:worldId/rovers/:roverId', (req, res) => this.getRoverById(req, res))
    this.router.post('/worlds/:worldId/rovers', (req, res) => this.createRover(req, res))
  }
}
