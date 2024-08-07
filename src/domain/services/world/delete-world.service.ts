import { WorldRepository } from '../../repositories';

export class DeleteWorldService {
  constructor(private readonly worldRepository: WorldRepository) {}

  async deleteWorld(worldId: string): Promise<void> {
    await this.worldRepository.delete(worldId);
  }
}