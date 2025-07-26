const knex = require("knex");
const knexFile = require("./knexfile");

const environment = process.env.NODE_ENV || "dev";

const db = knex(knexFile[environment]);
db.raw("SELECT 1")
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

module.exports = db;
