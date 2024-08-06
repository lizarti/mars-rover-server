export class InvalidRoverMovementException extends Error {
  constructor(message = 'Invalid movement') {
    super(message)
  }
}
