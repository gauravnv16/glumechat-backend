const express = require('express');
const router = express.Router();
const path = require('path');
const multer  = require('multer')
const upload = multer({ dest: __dirname+'/public' })
const FormData = require('form-data');
const fs = require('fs');
const {v4 : uuidv4} = require('uuid')

// console.log(upload);

//intialize the body-parser
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/messagefile', upload.array('image',12),(req, res) => {
   
    const base64 = req.body.image.split(",")[1];
    
    const buffer = Buffer.from(base64, "base64");
    const filename = req.body.filename.split(".");
    const ext = filename[filename.length-1];
    const newfilename = uuidv4()+"."+ext;

    try{
        fs.writeFileSync("/public/"+newfilename, buffer);
        res.json({message: "uploaded successfully",file:newfilename});
    }catch(err){
        console.log(err);
        res.json({message: "error uploading file"});
    }
    
    
});

router.get('/up', (req, res) => {
    // res.send("upload");
    // const fs = require("fs");
    // Reads file in form buffer => <Buffer ff d8 ff db 00 43 00 ...
    res.send("hello")
    // const buffer = fs.readFileSync("test-img.jpg");
    // console.log(buffer);
    // // Pipes an image with "new-path.jpg" as the name.
    // res.send(buffer);
    // fs.writeFileSync("new-path.jpg", buffer);
})

module.exports = router;