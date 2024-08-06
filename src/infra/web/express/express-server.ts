import express, { Application, Router } from 'express'
import { Server } from '../server'
import { Controller } from '../../../api/controllers/base.controller'

export class ExpressServer implements Server {
  private app: Application

  constructor(private controllers: Controller[], private port: number) {
    this.app = express()
    this.app.use(express.json())
    this.setupMiddlewares()
    this.setupControllers()
  }

  private setupMiddlewares(): void {
    this.app.use(express.json())
  }

  private setupControllers(): void {
    this.controllers.forEach((controller) => {
      controller.initializeRoutes()
      this.app.use('/api/', controller.getRouter())
    })
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })
  }
}
