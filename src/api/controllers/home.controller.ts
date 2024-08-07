import { Request, Response } from 'express'
import { Controller } from './base.controller'
import { OkResponse } from '../utils'

export class HomeController extends Controller {
  index(req: Request, res: Response) {
    const apiDocumentation = {
      '/': 'This page',
      '/api-docs': 'Swagger API documentation'
    }
    return new OkResponse(res, '', apiDocumentation).send()
  }
  initializeRoutes(): void {
    this.router.get('/', (req, res) => this.index(req, res))
  }
}