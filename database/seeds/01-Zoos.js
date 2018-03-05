
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('zoos').del()
    .then(function () {
      // Inserts seed entries
      return knex('zoos').insert([
        {id: 1, name: 'Detroit Zoo'},
        {id: 2, name: 'San Diego Zoo'},
        {id: 3, name: 'Brooklyn Zoo'}
      ]);
    });
};
