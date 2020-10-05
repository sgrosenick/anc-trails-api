const express = require('express');
const cors = require('cors');
const lessonsRouter = require('../routes/lessons-routes');
const messagesRouter = require('../routes/messages-routes');
const streetsRouter = require('../routes/streets-routes');

const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.json({message: "Server is running"});
});

server.use('/api/lessons', lessonsRouter);
server.use('/api/messages', messagesRouter);
server.use('/api/streets', streetsRouter);

module.exports = server;