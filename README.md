# Backend Setup Instructions

Follow these steps to run the backend for the Mars Rover project.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

## Installation

1. Run `npm install` to install the dependencies.

## Database Setup

The project is using Sqlite3 by default as the database. The database file is located at `/db.slite`.

If you want to use other databases, make sure to update the environment variables.

### Knex Migrations

To run the Knex migrations, follow these steps:

1. Open a terminal and navigate to the `/server` directory.
2. Run the following command: `npx knex migrate:latest`

## Environment Variables

The following environment variables need to be set:

- `DB_CLIENT`: The database client you are using. (e.g. `sqlite3`, `mysql`)
- `DB_HOST`: The hostname of your PostgreSQL database.
- `DB_PORT`: The port number of your PostgreSQL database.
- `DB_NAME`: The name of your PostgreSQL database.
- `DB_USER`: The username for your PostgreSQL database.
- `DB_PASSWORD`: The password for your PostgreSQL database.

Make sure to set these variables before running the backend.

## Running the Server as development

To run the server in development mode, follow these steps:

```bash
npm run dev
```

The server will start running on `http://localhost:3000`.
