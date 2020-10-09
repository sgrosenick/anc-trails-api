const db = require('../api/dbConfig');

module.exports = {
    getStreets
};

function getStreets() {

    return db('streets');
}

// To-Do: Add GET, POST, DELETE