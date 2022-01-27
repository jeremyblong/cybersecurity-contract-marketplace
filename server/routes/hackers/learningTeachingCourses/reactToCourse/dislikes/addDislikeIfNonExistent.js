const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');


router.post("/", (req, resppppp, next) => {
    
    const { signedInUserID, courseID, fullName } = req.body;

    const collection = Connection.db.db("db").collection("learningteachingcourses");

    collection.findOne({ id: courseID }).then((course) => {
        if (!course) {
            console.log("course does NOT exist or could not be found.");

            resppppp.json({
                message: "course does NOT exist or could not be found."
            })
        } else {
            console.log("course", course);

            if (course.dislikedBy.some(x => x.viewedBy === signedInUserID)) {
                const filtered = course.dislikedBy.filter((liked) => {
                    if (liked.viewedBy !== signedInUserID) {
                        return true;
                    }
                });
                course.dislikes -= 1;

                course.dislikedBy = filtered;

                collection.save(course, (errorrrrr, result) => {
                    if (errorrrrr) {
                        resppppp.json({
                            message: "Error attempting to save new course-data...",
                            err: errorrrrr
                        })
                    } else {
                        resppppp.json({
                            message: "Removed a dislike from this post/course!",
                            course
                        })
                    }
                })
            } else {
                course.dislikes += 1;

                const newUserObj = {
                    id: uuidv4(),
                    viewedBy: signedInUserID,
                    viewerName: fullName
                }

                course.dislikedBy.push(newUserObj);

                collection.save(course, (errorrrrr, result) => {
                    if (errorrrrr) {
                        resppppp.json({
                            message: "Error attempting to save new course-data...",
                            err: errorrrrr
                        })
                    } else {
                        resppppp.json({
                            message: "Successfully disliked this post!",
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