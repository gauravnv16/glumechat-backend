const express = require('express');
const router = express.Router();
const Users = [];

router.get('/', (req, res) => {
    res.json(Users);
})
router.post('/', (req, res) => {
    const user = Users.find((user) => user.username === req.query.username);
    if (user) {
        res.json({message:"user already exists with that name"});
    } else{
        Users.push(req.query);
        res.json(Users);
    }
    
})

router.get('/clear', (req, res) => {
    Users.length = 0;
    res.json({message:"users cleared successfully"});
})

module.exports = router;