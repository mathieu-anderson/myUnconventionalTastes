
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_movies_ratings').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users_movies_ratings').insert({id: 1, movie_id: '1', user_id:"1", user_rating:"10"}),
        knex('users_movies_ratings').insert({id: 2, movie_id: '2', user_id:"1", user_rating:"9"}),
        knex('users_movies_ratings').insert({id: 3, movie_id: '3', user_id:"3", user_rating:"8"}),
        knex('users_movies_ratings').insert({id: 4, movie_id: '1', user_id:"3", user_rating:"5"}),
        knex('users_movies_ratings').insert({id: 5, movie_id: '2', user_id:"2", user_rating:"7"}),
        knex('users_movies_ratings').insert({id: 6, movie_id: '3', user_id:"1", user_rating:"6"})
      ]);
    });
};
