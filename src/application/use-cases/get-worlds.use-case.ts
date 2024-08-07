import { GetWorldsResponseDto } from '../../api';
import { GetWorldsService } from '../../domain';

export class GetWorldsUseCase {
  constructor(private readonly getWorldsService: GetWorldsService) {}

  async execute(): Promise<GetWorldsResponseDto[]> {
    return this.getWorldsService.getAll();
  }
}