import { World } from '../../../domain'
import { WithTimestampsEntity } from './with-timestamps.entity'

export class WorldEntity extends WithTimestampsEntity {
  id: string
  name: string
  size_x: number
  size_y: number

  static toDomain(worldEntity: WorldEntity): World {
    const world = new World({
      width: worldEntity.size_x,
      height: worldEntity.size_y
    })
    world.id = worldEntity.id

    return world
  }
}
