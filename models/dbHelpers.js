const db = require('../api/dbConfig');

module.exports = {
    getStreets,
    getTracks,
    insertTracks,
    addUser,
    findUser
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

async function addUser(user) {
    return await db('users')
        .insert(user, ['username', 'password', 'strava_key']);
}

async function findUser(username) {
    return db('users').where({ username }).first();
}

// To-Do: Add GET, POST, DELETE