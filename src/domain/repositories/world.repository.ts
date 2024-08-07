import { World } from '../../domain/models'

export interface WorldRepository {
  create: (world: World) => Promise<World>
  findById: (id: string) => Promise<World | undefined>
  getAll: () => Promise<World[]>
  delete: (worldId: string) => Promise<void>
}
