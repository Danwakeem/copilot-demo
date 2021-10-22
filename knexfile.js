const { getCredentials } = require("./src/util/get.credentials");

// Update with your config settings.
const connection = getCredentials();

module.exports = {
  client: 'mysql2',
  connection: {
    host: 'db',
    database: 'books-app',
    user:     'book-user',
    password: 'password1'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
