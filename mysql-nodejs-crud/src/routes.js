const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/artists', (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO artists (name) VALUES (?)';
    db.query(query, [name], (err, result) => {
        if (err) throw err;
        res.status(201).send({ id: result.insertId, name });
    });
});

router.get('/artists', (req, res) => {
    const query = 'SELECT * FROM artists';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

router.put('/artists/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = 'UPDATE artists SET name = ? WHERE id = ?';
    db.query(query, [name, id], (err, result) => {
        if (err) throw err;
        res.status(200).send({ message: 'Artist updated' });
    });
});

router.delete('/artists/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM artists WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.status(200).send({ message: 'Artist deleted' });
    });
});

module.exports = router;
