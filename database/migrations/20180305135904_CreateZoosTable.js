
exports.up = function(knex, Promise) {// is ofr making changes to the database
  return knex.schema.createTable('zoos', tbl => {
    tbl.increments(); // creates a primary key called id

    tbl.string('name', 255).notNull().unique('name'); //must have a unie value

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) { // for undoing the changes
  return knex.schema.dropTableIfExists('zoos')
};
