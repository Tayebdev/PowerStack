exports.up = function (knex) {
  return knex.schema.createTable("admin", function (table) {
    table.increments("id").primary();
    table.string("storeName").notNullable();
    table.string("email").notNullable().unique();
    table.json("phones").notNullable();
    table.string("whatsapp");
    table.string("instagram");
    table.string("tiktok");
    table.string("facebook");
    table.string("openHours").notNullable();
    table.string("storeStatus").notNullable();
    table.string("mapUrl").notNullable();
    table.string("role").defaultTo("admin");
    table.string("password").notNullable();
    table.timestamp("passwordChangedAt");
    table.string("passwordResetCode");
    table.timestamp("passwordResetExpires").nullable().defaultTo(null);
    table.boolean("passwordResetVerified").defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("admin");
};
