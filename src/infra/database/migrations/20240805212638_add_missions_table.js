/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('missions', (table) => {
    table.uuid('id').primary()
    table.uuid('rover_id').notNullable()
    table.foreign('rover_id').references('id').inTable('worlds')
    table.integer('instructions').notNullable()
    table.integer('start_position_x').notNullable()
    table.integer('start_position_y').notNullable()
    table.integer('start_orientation_x').notNullable()
    table.integer('start_orientation_y').notNullable()
    table.integer('end_position_x').notNullable()
    table.integer('end_position_y').notNullable()
    table.integer('end_orientation_x').notNullable()
    table.integer('end_orientation_y').notNullable()
    table.integer('duration_in_seconds').notNullable()
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('missions')
}
