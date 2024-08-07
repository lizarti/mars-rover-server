import { Logger } from '../../domain';
import { consola } from 'consola'

export class ConsolaLogger implements Logger {
  info(message: string): void {
    consola.info(message)
  }

  error(message: string): void {
    consola.error(message)
  }

  warn(message: string): void {
    consola.warn(message)
  }
}