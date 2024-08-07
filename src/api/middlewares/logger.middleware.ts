import { NextFunction, Request, Response } from 'express'
import { Logger } from '../../domain'

export class LoggerMiddleware {
  constructor(private logger: Logger) {
    this.logger = logger
  }

  install() {
    return (req: Request, res: Response, next: NextFunction) => {
      this.logger.info(`${req.method} ${req.path}`)
      next()
    }
  }
}