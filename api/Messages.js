const express = require('express');
const router = express.Router();
// const Messages = [];

//intialize the body-parser
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// import mongoose
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://Gaurav_nv:Amirtha28@cluster0.83xxr.mongodb.net/glumeChat?retryWrites=true&w=majority`,() => {});


// define message schema
const messageSchema = new mongoose.Schema({
    from: String,
    to: String,
    text: String,
    time: String,
});

// create message model
const Message = mongoose.model('Message', messageSchema);


router.post('/sendMessage', (req, res) => {
    //send message to the database
    const message = new Message({
        from: req.body.from,
        to: req.body.to,
        text: req.body.text,
        time: req.body.time,
    });
    message.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.json({message:"message sent successfully"});
        }
    });
});

router.get('/', (req, res) => {
    //fetch the messages from the database
    Message.find({}, (err, messages) => {
        if (err) {
        console.log(err);
        } else {
            res.json(messages);
        }
    }
    )
});

router.get('/clear', (req, res) => {
    Messages.length = 0;
    res.json({message:"messages cleared successfully"});
})
module.exports = router;