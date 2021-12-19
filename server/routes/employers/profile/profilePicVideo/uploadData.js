const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const moment = require("moment");

const s3 = new aws.S3();
const s3Bucket = new aws.S3({ params: { Bucket: config.get("awsBucketName") }});

const generatedID = uuidv4();

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
    
    const { uniqueId, video } = req.body;

    const collection = Connection.db.db("db").collection("employers");

    if (typeof req.file === "undefined") {

        console.log("this one ran.");
        
        const generatedIDImage = uuidv4();

        const { mimetype, name, base64 } = req.body;

        const buf = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""),'base64');

        const data = {
            Key: generatedIDImage, 
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: mimetype
        };
        s3Bucket.putObject(data, (err, data) => {
              if (err) { 
                console.log(err);
                console.log('Error uploading data: ', data); 
              } else {
                console.log('successfully uploaded the image!');

                const compoundedFile = {
                    id: uuidv4(),
                    systemDate: new Date(),
                    date: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                    link: generatedIDImage,
                    type: mimetype,
                    name: name,
                    dataType: mimetype.includes("video") ? "video" : "image"
                }
        
                collection.findOneAndUpdate({ uniqueId }, { $push: { "profilePicsVideos": compoundedFile }}, (err, user) => {
                    if (err) {
                        console.log("User does NOT exist or could not be found.", err);
                    } else {
                        console.log("user", user);
        
                        resppppp.json({
                            message: "Successfully uploaded content!",
                            generatedID: generatedIDImage,
                            file: compoundedFile
                        })
                    }
                })
              }
        });
    } else {

        console.log("other one ran!");
        
        const { fieldname, originalname, mimetype, key } = req.file;

        const compoundedFile = {
            id: uuidv4(),
            systemDate: new Date(),
            date: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
            link: key,
            type: mimetype,
            name: originalname,
            dataType: mimetype.includes("video") ? "video" : "image"
        }

        collection.findOneAndUpdate({ uniqueId }, { $push: { "profilePicsVideos": compoundedFile }}, (err, user) => {
            if (err) {
                console.log("User does NOT exist or could not be found.", err);
            } else {
                console.log("user", user);

                resppppp.json({
                    message: "Successfully uploaded content!",
                    generatedID: key,
                    file: compoundedFile
                })
            }
        })
    }
});

module.exports = router;