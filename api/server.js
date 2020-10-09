const express = require('express');
const cors = require('cors');
const streetsRouter = require('../routes/streets-routes');

const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.json({message: "Server is running"});
});

server.use('/api/streets', streetsRouter);

module.exports = server;