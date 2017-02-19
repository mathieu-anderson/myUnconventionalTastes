
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, user_name: 'Mat'}),
        knex('users').insert({id: 2, user_name: 'Bill'}),
        knex('users').insert({id: 3, user_name: 'Sean'})
      ]);
    });
};
