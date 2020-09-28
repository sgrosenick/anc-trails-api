const express = require('express');

const server = express();
const PORT = 5000;

server.get('/', (req, res) => {
    res.json({hello: "world"});
});

server.listen(PORT, () => {
    console.log(`\n Server Running...`);
});