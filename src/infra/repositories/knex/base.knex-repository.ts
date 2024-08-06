import { Knex } from 'knex'
import { knex } from '../../database/datasource'
import { BaseEntity } from '../../database/entities'

export class BaseKnexRepository<T extends BaseEntity> {
  protected db: Knex
  constructor(protected table: string) {
    this.db = knex
    this.table = table
  }

  protected getTable() {
    return this.db<T>(this.table)
  }
}
