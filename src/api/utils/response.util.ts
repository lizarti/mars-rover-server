import { Response } from 'express'

export class ApiResponse<T> {
  protected res: Response
  protected message: string
  protected data: any
  protected status: number = 200

  constructor(res: Response, message: string, data: any = null) {
    this.res = res
    this.message = message
    this.data = data
  }

  setStatus(status: number) {
    this.res.status(status)
    return this
  }

  send() {
    return this.res.status(this.status).json({
      message: this.message,
      data: this.data,
      timestamp: Date.now()
    })
  }
}

export class OkResponse extends ApiResponse<any> {
  protected status: number = 200
}

export class CreatedResponse extends ApiResponse<any> {
  protected status: number = 201
}

export class NoContentResponse extends ApiResponse<any> {
  protected status: number = 204
}

export class BadRequestResponse extends ApiResponse<any> {
  protected status: number = 400
}

export class UnauthorizedResponse extends ApiResponse<any> {
  protected status: number = 401
}

export class ForbiddenResponse extends ApiResponse<any> {
  protected status: number = 403
}

export class NotFoundResponse extends ApiResponse<any> {
  protected status: number = 404
}
