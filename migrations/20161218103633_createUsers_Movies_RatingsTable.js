
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users_movies_ratings", function(table){
    table.increments();
    table.integer("movie_id");
    table.integer("user_id");
    table.integer("user_rating");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users_movies_ratings");
};
