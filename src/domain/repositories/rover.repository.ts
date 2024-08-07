import { Rover } from '../../domain/models'

export interface RoverRepository {
  create: (rover: Rover) => Promise<Rover>
  findById: (id: string) => Promise<Rover | undefined>
  findByWorldId: (worldId: string) => Promise<Rover[]>
  updatePosition: (rover: Rover) => Promise<Rover>
  deleteRover(id: string): Promise<void>
}
