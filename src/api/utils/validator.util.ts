import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

type ClassConstructor<T> = new (...args: any[]) => T

class ValidationError extends Error {
  constructor(public message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export async function validateBody<T>(dtoClass: ClassConstructor<T>, requestBody: any) {
  const dtoObject = plainToInstance(dtoClass as any, requestBody) as object

  const errors = await validate(dtoObject)
  if (Array.isArray(errors)) {
    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => {
          return Object.values(error.constraints || {}).join(', ')
        })
        .join('; ')
      throw new ValidationError(errorMessages)
    }
  }

  return dtoObject as T
}
