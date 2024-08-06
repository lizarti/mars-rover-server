export class RoverNotFoundException extends Error {
  constructor() {
    super('Rover not found')
  }
}
