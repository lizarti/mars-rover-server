import type { World } from '../models'

export interface RendererEngine {
  clear(): void
  getWorld(): World
}
