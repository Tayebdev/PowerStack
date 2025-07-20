require("dotenv").config();
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
     // directory: path.resolve(__dirname, "../dbConfig/migrations"),
     directory: "../dbConfig/migrations",
    },
  },
};
