import type { RendererEngine } from './renderer-engine.interface'

export interface Renderer<T> {
  render(renderer: RendererEngine, renderingObject: T): void
}
