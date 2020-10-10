const db = require('../api/dbConfig');

module.exports = {
    getStreets,
    getTracks,
    insertTracks,
};

function getStreets() {

    return db('streets');
}

function getTracks() {
    return db('tracks');
}

async function insertTracks(tracks) {
    return await db('tracks')
        .insert(tracks, []);
}

// To-Do: Add GET, POST, DELETE