const express = require('express');
const lessons = require('./models/dbHelpers');

const server = express();
server.use(express.json());
const PORT = 5000;

server.post('/api/lessons', (req, res) => {
    lessons.add(req.body)
        .then(lesson => {
            res.status(200).json(lesson);
        })
        .catch(error => {
            res.status(500).json({message: "Error adding lesson"});
        });
});

server.get('/api/lessons', (req, res) => {
    lessons.find()
        .then(lessons => {
            res.status(200).json(lessons);
        })
        .catch(error => {
            res.status(500).json({message: "Error finding lessons"});
        });
});

server.get('/api/lessons/:id', (req, res) => {
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

server.delete('/api/lessons/:id', (req, res) => {
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

server.patch('/api/lessons/:id', (req, res) => {
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
})


server.listen(PORT, () => {
    console.log(`\n Server Running...`);
});  