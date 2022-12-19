const express = require('express');
const router = express.Router();
const Messages = [];

router.get('/', (req, res) => {
    res.json(Messages);
});

router.post('/', (req, res) => {
    Messages.push(req.query);
    res.json(Messages);
});
module.exports = router;