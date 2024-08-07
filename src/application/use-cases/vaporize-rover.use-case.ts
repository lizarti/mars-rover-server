import { RoverRepository } from '../../domain/repositories'

export class VaporizeRoverUseCase {
  constructor(private readonly roverRepository: RoverRepository) {}

  async execute(roverId: string): Promise<void> {
    await this.roverRepository.deleteRover(roverId)   
  }
}