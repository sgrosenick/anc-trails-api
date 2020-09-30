const express = require('express');
const lessons = require('../models/dbHelpers');

const router = express.Router();


router.delete('/:id', (req, res) => {
    const { id } = req.params;

    lessons.removeMessage(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: "Successfully deleted mesesage"});
            } else {
                res.status(404).json({message: "Error deleting message"});
            }
        })
        .catch(error => {
            res.status(500).json(error.message);
        });
});

module.exports = router;