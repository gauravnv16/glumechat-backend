//setup express server
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const user = require('./api/User');
const message = require('./api/Messages');
const upload = require('./api/Upload');
const path = require('path');
require('dotenv').config()
const cors = require('cors');


app.use(cors({
    origin: '*'
}));
app.use("/api/users",user)
app.use("/api/messages",message)
app.use("/api/upload",upload)
app.use("/api/static",express.static('public'));
app.get('/', (req, res) => {
    res.send("server Ready");
})


app.listen(port);