const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {v4 : uuidv4} = require('uuid')

//intialize the body-parser
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Users = [];

// define user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    id: String,
    password: String,
});

// create user model


mongoose.connect(`mongodb+srv://Gaurav_nv:Amirtha28@cluster0.83xxr.mongodb.net/glumeChat?retryWrites=true&w=majority`,() => {});
const User = mongoose.model('User', userSchema);
// import mongoose


// router.get('/', (req, res) => {
//     res.json(Users);
// })
router.get('/', (req, res) => {
    //fetch the user from the database
    User.find({}, (err, users) => {
        if (err) {
        console.log(err);
        } else {
            res.json(users);
        }
    })
})

router.post('/login', (req, res) => {
    console.log(req.body);
    User.find({ email: req.body.email} , (err, user) => {
        let user_resp = user[0];
        if (err) {
            res.json({message: "user not found"});
        } else {
            if (user_resp.password === req.body.password) {
                const UObj = {
                    name: user_resp.name,
                    id: user_resp.id,
                    lastmessage: user_resp.lastmessage,
                    status: user_resp.status,
                    time: user_resp.time,
                }
                res.json({message: "user logged in successfully",user:UObj});
            } else {
                res.json({message: "incorrect password"});
            }
        }
    })
})

// register function
router.post('/register', (req, res) => {
    const user = Users.find((user) => user.username === req.body.username);
    if (user) {
        res.json({message:"user already exists with that name"});
    } else{
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            id: req.body.id,
            password: req.body.password,
            lastmessage:"",
            status:"",
            time:"",
        });
        newUser.save();
        res.json({message:"user registered successfully"});
    }
    // console.log(req.body);
    // res.json({message:"user registered successfully"});
})

router.get('/clear', (req, res) => {
    Users.length = 0;
    res.json({message:"users cleared successfully"});
})

module.exports = router;