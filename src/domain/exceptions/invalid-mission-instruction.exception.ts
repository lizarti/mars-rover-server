export class InvalidMissionInstructionException extends Error {
  constructor(message = 'Invalid instruction') {
    super(message)
  }
}
