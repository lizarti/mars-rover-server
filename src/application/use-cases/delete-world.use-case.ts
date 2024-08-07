import { DeleteWorldService } from '../../domain';

export class DeleteWorldUseCase {
  constructor(private readonly deleteWorldService: DeleteWorldService) {}

  async execute(worldId: string): Promise<void> {
    await this.deleteWorldService.deleteWorld(worldId);
  }
}
