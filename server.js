const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db');

const server = express();

server.use(bodyParser.json());

// endpoints here

server.get('/', (req, res) => {
    res.status(200).json({api: 'running .....'})
});

server.post('/api/zoos', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(404).json({message: 'Must provide a name'});
    } else {
        // knex.insert({name}).into('zoos)
        knex('zoos').insert({ name })
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    }
});

server.get('/api/zoos', (req, res) => {
    knex('zoos')
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

server.get('/api/zoos/:id', (req, res) => {
    const { id } = req.params;

    knex('zoos').where('id', id)
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

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});
