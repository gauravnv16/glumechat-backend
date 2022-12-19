//setup express server
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const user = require('./api/User');
const message = require('./api/Messages');
require('dotenv').config()
const cors = require('cors');


app.use(cors({
    origin: '*'
}));
app.use("/api/users",user)
app.use("/api/messages",message)

app.get('/', (req, res) => {
    res.send("server Ready");
})


app.listen(port);