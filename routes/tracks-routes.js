const express = require('express');
const db = require('../models/dbHelpers');

const router = express.Router();

router.get('/', (req, res) => {
    db.getTracks()
        .then(tracks => {
            res.status(200).json(tracks);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

router.post('/', (req, res) => {
    db.insertTracks(req.body)
        .then(tracks => {
            res.status(200).json(tracks);
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

module.exports = router;