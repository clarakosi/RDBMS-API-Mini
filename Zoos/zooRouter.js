const express = require('express');
const knex = require('../database/db');

const db = require('./zooController');
const zooRouter = express.Router();

zooRouter.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
      res.status(404).json({message: 'Must provide a name'});
  } else {
      // knex.insert({name}).into('zoos)
      db.addZoo(name)
          .then(response => {
              res.status(201).json(response);
          })
          .catch(error => {
              res.status(500).json(error);
          })
  }
});

zooRouter.get('/', (req, res) => {
  db.getAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json(error);
    })

});

zooRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db.getById(id)
    .then(data => {
      if (data.length === 0) {
          res.status(404).json({message: 'No zoo with that id exists'});
      } else {
          res.status(200).json(data);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

zooRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.nuke(id)
    .then(data => {
      if (data.length === 0) {
          res.status(404).json({message: 'No zoo with that id exists'});
      } else {
          res.status(200).json(data);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});


zooRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const zoo = req.body;

  db.update(id, zoo)
    .then(data => {
      if (data.length === 0) {
          res.status(404).json({message: 'No zoo with that id exists'});
      } else {
          res.status(200).json(data);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});
module.exports = zooRouter;
