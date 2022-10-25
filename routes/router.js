const express = require('express');
const router = express.Router();

// list of ninjas
router.get('/', (req, res) => {
    res.send({});
});

// add ninjas
router.post('/', (req, res) => {
    res.send({});
});

// update ninjas
router.put('/:id', (req, res) => {
    res.send({});     
});

// delete ninjas
router.delete('/:id', (req, res) => {
    res.send({});
});

module.exports = router;