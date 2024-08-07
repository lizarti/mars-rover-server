import express, { Application, NextFunction, Request, Response } from 'express'
import { Server } from '../server'
import { Controller } from '../../../api/controllers/base.controller'

type Middleware = (req: Request, res: Response, next: NextFunction) => void

export class ExpressServer implements Server {
  private app: Application

  constructor(private controllers: Controller[], private middlewares: Middleware[], private port: number) {
    this.app = express()
    this.app.use(express.json())
    this.setupMiddlewares()
    this.setupControllers()
  }

  private setupMiddlewares(): void {
    this.middlewares.forEach((middleware) => {
      this.app.use(middleware)
    })
  }

  private setupControllers(): void {
    this.controllers.forEach((controller) => {
      controller.initializeRoutes()
      this.app.use(controller.getRouter())
    })
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })
  }
}
