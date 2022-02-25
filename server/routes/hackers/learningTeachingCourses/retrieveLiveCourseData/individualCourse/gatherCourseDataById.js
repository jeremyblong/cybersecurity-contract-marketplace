const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.get("/", (req, resppppp, next) => {
    
    const { id, signedInUserID, fullName } = req.query;

    const collection = Connection.db.db("db").collection("learningteachingcourses");

    collection.findOne({ id }).then((course) => {
        if (!course) {
            console.log("course does NOT exist or could not be found.");

            resppppp.json({
                message: "course does NOT exist or could not be found."
            })
        } else {
            console.log("course", course);

            if (course.viewedByList.some(x => x.viewedBy === signedInUserID)) {
                resppppp.json({
                    message: "Successfully fetched course/listing!",
                    course
                })
            } else {
                course.totalViews += 1;

                const newUserObj = {
                    id: uuidv4(),
                    viewedBy: signedInUserID,
                    viewerName: fullName
                }

                course.viewedByList.push(newUserObj);

                collection.save(course, (errorrrrr, result) => {
                    if (errorrrrr) {
                        resppppp.json({
                            message: "Error attempting to save new course-data...",
                            err: errorrrrr
                        })
                    } else {
                        resppppp.json({
                            message: "Successfully fetched course/listing!",
                            course
                        })
                    }
                })
            }
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