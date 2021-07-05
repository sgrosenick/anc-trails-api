const express = require('express');
const db = require('../models/dbHelpers');
const bcrypt = require('bcryptjs');
const { route } = require('../api/server');

const router = express.Router();

router.post('/register', (req, res) => {
    const credentials = req.body;
    const { username, password, strava_key } = credentials;

    if (!(username && password && strava_key)) {
        return res.status(400).json({ message: "Username, password, and strava key required" });
    }

    const passwordHash = bcrypt.hashSync(credentials.password, 12);
    const keyHash = bcrypt.hashSync(credentials.strava_key, 12);

    credentials.password = passwordHash;
    credentials.strava_key = keyHash;

    db.addUser(credentials)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500);
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!(username && password)) {
        return res.status(400).json({ message: "Username and password required" });
    }

    db.findUser(username)
        .then( user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome, ${user.username}` });
            } else {
                res.status(401).json({ message: "Login failed." });
            }
        })
        .catch( error => {
            res.status(500).json(error);
        });

});

module.exports = router;