export class WorldNotFoundException extends Error {
  constructor() {
    super('World not found')
  }
}
