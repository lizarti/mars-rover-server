/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('rovers', (table) => {
    table.uuid('id').primary()
    table.uuid('world_id').notNullable()
    table.foreign('world_id').references('id').inTable('worlds')
    table.integer('landed_position_x').notNullable()
    table.integer('landed_position_y').notNullable()
    table.integer('landed_orientation_x').notNullable()
    table.integer('landed_orientation_y').notNullable()
    table.integer('current_position_x').notNullable()
    table.integer('current_position_y').notNullable()
    table.integer('current_orientation_x').notNullable()
    table.integer('current_orientation_y').notNullable()
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
