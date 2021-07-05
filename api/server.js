const express = require('express');
const cors = require('cors');
const streetsRouter = require('../routes/streets-routes');
const tracksRouter = require('../routes/tracks-routes');
const usersRouter = require('../routes/users-routes');

const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.json({message: "Server is running"});
});

server.use('/api/streets', streetsRouter);
server.use('/api/tracks', tracksRouter);
server.use('/api/users', usersRouter);

module.exports = server;