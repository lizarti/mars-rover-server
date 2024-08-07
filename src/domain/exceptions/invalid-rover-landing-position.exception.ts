export class InvalidRoverLandingPositionException extends Error {
  constructor(message: string = 'Invalid rover landing position') {
    super(message)
  }
}