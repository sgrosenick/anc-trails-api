const db = require('../api/dbConfig');

module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    findMessageById,
    findMessages,
    addMessage,
    removeMessage,
    getStreets
};

async function add(lesson) {
    const [id] = await db('lessons').insert(lesson);

    return id;
};

function getStreets() {
    //return db('anchoragestreets');
    return db.select('*, ST_asGeoJSON(geom, 5) as geoJson').from('anchoragestreets');
}

function find() {
    return db('lessons');
};

function findById(id) {
    return db('lessons')
        .where({ id })
        .first();
};

function remove(id) {
    return db('lessons')
        .where({ id })
        .del();
};

function update(id, changes) {
    return db('lessons')
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id);
        });
    
};

function findMessageById(id) {
    return db('messages')
        .where({ id })
        .first();
};

async function addMessage(message, lesson_id) {
    const [ id ] = await db('messages')
        .where({ lesson_id })
        .insert(message);

    return findMessageById(id);
};

function findMessages(lesson_id) {
    return db("lessons as l")
        .join("messages as m", "l.id", "m.lesson_id")
        .select(
            "l.id as Lesson ID",
            "l.name as Lesson",
            "m.id as Message ID",
            "m.sender as Sender",
            "m.text as Text"
        )
        .where({ lesson_id });
};

function removeMessage(id) {
    return db("messages")
        .where({ id })
        .del();
}