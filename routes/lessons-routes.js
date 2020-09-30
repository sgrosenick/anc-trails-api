const express = require('express');
const lessons = require('../models/dbHelpers');

const router = express.Router();

router.post('/', (req, res) => {
    lessons.add(req.body)
        .then(lesson => {
            res.status(200).json(lesson);
        })
        .catch(error => {
            res.status(500).json({message: "Error adding lesson"});
        });
});

router.get('/', (req, res) => {
    lessons.find()
        .then(lessons => {
            res.status(200).json(lessons);
        })
        .catch(error => {
            res.status(500).json({message: "Error finding lessons"});
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    lessons.findById(id)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson);
            } else {
                res.status(404).json({message: "Cannot find lesson"});
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error finding lesson"});
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    lessons.remove(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: "lesson deleted"});
            } else {
                res.status(404).json({message: "Cannot find lesson"});
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error finding lesson"});
        });
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    lessons.update(id, changes)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson);
            } else {
                res.status(404).json({message: "Cannot find lesson"});
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error finding lesson"});
        });
});

router.post('/:id/messages', (req, res) => {
    const { id } = req.params;
    const message = req.body;

    lessons.findById(id)
        .then(lesson => {
            if (!lesson) {
                res.status(404).json({message: "Cannot find lesson"});
            }

            if (!message.sender || !message.text) {
                res.status(400).json({message: "Message missing sender or text"});
            }

            if (!message.lesson_id) {
                message["lesson_id"] = parseInt(id, 10);
            }

            lessons.addMessage(message, id)
                .then(message => {
                    if (message) {
                        res.status(200).json(message);
                    } else {
                        res.status(404).json({message: "Error saving message"});
                    }
                })
                .catch(error => {
                    res.status(500).json({message: "Failed to add message"});
                })
        })
        .catch(error => {
            res.status(500).json({message: error.message});
        });
});

router.get('/:id/messages', (req, res) => {
    const { id } = req.params;

    lessons.findMessages(id)
        .then(lessons => {
            if (lessons) {
                res.status(200).json(lessons);
            } else {
                res.status(404).json({message: "Cannot find lessons"});
            }
        })
        .catch(error => {
            res.status(500).json({message: error.message});
        });
 });

 module.exports = router;