
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bears').del()
    .then(function () {
      // Inserts seed entries
      return knex('bears').insert([
        {id: 1, zooId: '1', species: 'American Black Bear', latinName: 'Ursus americanus'},
        {id: 2, zooId: '1', species: 'Polar Bear', latinName: 'Ursus maritimus'},
        {id: 3, zooId: '2', species: 'Giant Panda', latinName: 'Ailuropoda melanoleuca'}
      ]);
    });
};
