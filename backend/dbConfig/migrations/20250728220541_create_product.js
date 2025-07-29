/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product", function (table) {
    table.increments("id").primary();
    table.string("name", 30).notNullable();
    table.string("picture", 200).notNullable();
    table.string("price", 10).notNullable();
    table.integer("quantity");
    table.json("flavor");
    table.integer("brandId").unsigned();
    table.integer("categoryId").unsigned();

    table
      .foreign("brandId")
      .references("id")
      .inTable("brand")
      .onDelete("CASCADE");

    table
      .foreign("categoryId")
      .references("id")
      .inTable("category")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product");
};
