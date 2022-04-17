const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const moment = require("moment");
const { Connection } = require("../../../mongoUtil.js");


const generatedID = uuidv4();

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.get("awsBucketName"),
        key: function (req, file, cb) {
            console.log(file);

            cb(null, generatedID); 
        }
    })
});

router.post("/", upload.single('file'), (req, resppppp, next) => {

    const { uniqueId } = req.body;

    console.log("req.body", req.body);

    const collection = Connection.db.db("db").collection("employers");

    collection.findOne({ uniqueId }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            user["companyIntroductionVideo"] = {
                resource: generatedID,
                date: new Date(),
                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                id: uuidv4()
            };

            collection.save(user, (errorrrrr, result) => {
                if (errorrrrr) {
                    console.log("errorrrrr", errorrrrr);

                    resppppp.json({
                        message: "An error while saving occurred..",
                        err: errorrrrr
                    })
                } else {
                    console.log("successfully saved!");

                    resppppp.json({
                        message: "Successfully uploaded file!",
                        user
                    })
                }
            })
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err
        })
    })
});

module.exports = router;