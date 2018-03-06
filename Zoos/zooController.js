const knex = require('../database/db');

const db = {
  getAll: function() {
    return knex('zoos');
  },
  getById: function(id) {
    return knex('zoos').where({ id });
  },
  addZoo: function(name) {
    return knex('zoos').insert({ name });
  },
  nuke: function(id) {
    return knex('zoos').where({ id }).del();
  },
  update: function(id, zoo) {
    return knex('zoos').where({ id }).update(zoo);
  }
}

module.exports = db;