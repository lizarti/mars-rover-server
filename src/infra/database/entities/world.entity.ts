import { World } from '../../../domain'
import { WithTimestampsEntity } from './with-timestamps.entity'

export class WorldEntity extends WithTimestampsEntity {
  id: string
  name: string
  width: number
  height: number
  rovers_count?: number

  static toDomain(worldEntity: WorldEntity): World {
    const world = new World({
      width: worldEntity.width,
      height: worldEntity.height
    })
    world.id = worldEntity.id
    world.name = worldEntity.name

    if (worldEntity.rovers_count) {
      world.setRoversCount(worldEntity.rovers_count)
    }

    return world
  }
}
