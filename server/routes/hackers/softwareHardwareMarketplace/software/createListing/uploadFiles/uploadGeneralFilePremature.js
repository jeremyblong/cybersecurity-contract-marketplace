const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const moment = require("moment");

const s3 = new aws.S3();
// const s3Bucket = new aws.S3({ params: { Bucket: config.get("awsBucketName") }});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.get("awsBucketName"),
        key: function (req, file, cb) {
            console.log(file);

            const generatedID = uuidv4();

            cb(null, generatedID); 
        }
    })
});

router.post("/", upload.single('file'), (req, resppppp, next) => {

    const { fieldname, originalname, mimetype, key, size } = req.file;

    const compoundedFile = {
        id: uuidv4(),
        systemDate: new Date(),
        date: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        link: key,
        type: mimetype,
        name: originalname,
        dataType: "unknown",
        size
    };

    resppppp.json({
        message: "Successfully uploaded file!",
        generatedID: key,
        file: compoundedFile
    })
});

module.exports = router;