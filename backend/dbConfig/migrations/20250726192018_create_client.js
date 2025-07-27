/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("client", function (table) {
    table.increments("id").primary();
    table.string("firstName", 30).notNullable();
    table.string("lastName", 30).notNullable();
    table.string("phone", 15).notNullable();
    table.string("wilaya").notNullable();
    table.string("commune").notNullable();
    table.string('email',50).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("client");
};
