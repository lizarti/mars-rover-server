import Knex from 'knex'

// Initialize Knex
const config = {
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
}
export const knex = Knex(config)
