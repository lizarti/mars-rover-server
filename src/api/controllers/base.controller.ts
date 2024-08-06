import { Router } from 'express'

export abstract class Controller {
  protected router: Router

  constructor() {
    this.router = Router()
  }
  abstract initializeRoutes(): void

  public getRouter(): Router {
    return this.router
  }
}
