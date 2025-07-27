const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    },
    migrations: {
      directory: path.resolve(__dirname, "dbConfig/migrations"),
    },
  },
  production: {
    client: "mysql",
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    },
    migrations: {
      directory: path.resolve(__dirname, "dbConfig/migrations"),
    },
  },
};
