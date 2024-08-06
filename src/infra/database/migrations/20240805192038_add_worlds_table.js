/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('worlds', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.integer('size_x').notNullable()
    table.integer('size_y').notNullable()
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('rovers')
}
