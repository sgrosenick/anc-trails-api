const express = require('express');
const db = require('../models/dbHelpers');

const router = express.Router();

router.get('/', (req, res) => {
    db.getStreets()
        .then(streets => {
            res.status(200).json(streets);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

module.exports = router;