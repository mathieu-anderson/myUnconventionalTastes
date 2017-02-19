
exports.up = function(knex, Promise) {
  return knex.schema.createTable("profile", function (table) {
    table.increments();
    table.string("title");
    table.integer("imdb_rating");
    table.integer("your_rating")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("profile")
};
