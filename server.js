const express = require('express');
const bodyParser = require('body-parser');
const zooRouter = require('./Zoos/zooRouter');

const knex = require('./database/db');

const server = express();

server.use(bodyParser.json());

// endpoints here

server.get('/', (req, res) => {
    res.status(200).json({api: 'running .....'})
});

server.use('/api/zoos', zooRouter);


// update zooId in bears ;
server.put('/api/bears/', (req, res) => {
    const { id, zooId } = req.body;

    if (!id || !zooId) {
        res.status(404).json({message: 'Must provide both an id and zooId'})
    } else {
        knex('bears').where({ id }).update({ zooId })
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    }
});

// delete a bear by id 
server.delete('/api/bears/:id', (req, res) => {
    const { id } = req.params;

    knex('bears').where({ id }).del()
        .then(response => {
            if (response === 0) {
                res.status(404).json({message: `No bear with id:${id} exists.`})
            } else {
                res.status(202).json({message: `Bear with id:${id} has been deleted.`});
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
