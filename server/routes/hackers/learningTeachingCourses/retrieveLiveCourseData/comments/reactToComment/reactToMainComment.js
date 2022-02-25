const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", (req, resppppp, next) => {
    // id === signed in user ID
    const { id, emojiName, courseId, commentID, comment } = req.body;

    const collection = Connection.db.db("db").collection("learningteachingcourses");

    collection.findOne({ id: courseId }).then((course) => {
        if (!course) {
            console.log("course does NOT exist or could not be found.");

            resppppp.json({
                message: "course does NOT exist or could not be found."
            })
        } else {
            // loop over course comments to find match && save changes (better not to use reduce, map, forEach, etc...) at end
            for (let index = 0; index < course.comments.length; index++) {
                const commenttt = course.comments[index];
                // Check for matching comment
                if (commenttt.id === commentID) {
                    // matched && check if user has already responded to comment...
                    if (commenttt.alreadyReacted.some(x => x.responder === id)) {
                        // create index variable
                        const indexed = commenttt.alreadyReacted.findIndex(obj => obj.responder === id);
                        // filter out non loggin-in user intiiated events
                        const filteredOut = commenttt.alreadyReacted.filter((already) => {
                            if (already.responder !== id) {
                                return true;
                            }
                        });
                        // find element user already reacted to
                        const selected = commenttt.alreadyReacted[indexed];
                        // remove 1 (-1) from emoji specific count
                        commenttt.reactions[selected.response] -= 1;
                        // reassign alreadyReacted array to newly filtered array
                        commenttt.alreadyReacted = filteredOut;
                        // save new information...
                        collection.save(course, (errrrrr, result) => {
                            if (errrrrr) {
                                console.log("errrrrr", errrrrr);

                                resppppp.json({
                                    message: "Error attempting to finally save modified data...",
                                    err: errrrrr
                                })
                            } else {
                                resppppp.json({
                                    message: "You've already reacted to this comment! Since you've previously reacted, we're removing your existing response so you can update it!",
                                    course,
                                    commenttt
                                })
                            }
                        })
                    } else {
                        // does NOT already include... respond with emoji to comment!
                        commenttt.reactions[emojiName] += 1;
                        // create newResponse obj 
                        const newResponse = {
                            id: uuidv4(),
                            responder: id,
                            response: emojiName
                        }
                        // push into array to track who's liked & not liked yet
                        commenttt.alreadyReacted.push(newResponse);
                        // save data...
                        collection.save(course, (errrrrr, result) => {
                            if (errrrrr) {
                                console.log("errrrrr", errrrrr);

                                resppppp.json({
                                    message: "Error attempting to finally save modified data...",
                                    err: errrrrr
                                })
                            } else {
                                resppppp.json({
                                    message: "Successfully reacted to comment!",
                                    course,
                                    commenttt
                                })
                            }
                        })
                    }
                }
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