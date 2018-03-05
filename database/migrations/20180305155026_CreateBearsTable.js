
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bears', (table) => {
    table.increments();

    table.integer('zooId').unsigned();
    table.foreign('zooId').references('zoos.id');

    table.string('species', 80).notNullable().unique('species');
    table.string('latinName', 80).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  })
  
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('bears');
};
