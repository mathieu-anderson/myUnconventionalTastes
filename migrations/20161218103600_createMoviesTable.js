
exports.up = function(knex, Promise) {
  return knex.schema.createTable("movies", function(table){
    table.increments();
    table.string("title");
    table.string("poster");
    table.string("plot");
    table.integer("rating");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("movies");
};
