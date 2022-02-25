const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", (req, resppppp, next) => {
    // id is signed in user (commenter) ID
    // courseId is the course identification string
    // comment is what the signed in user is posting..
    const { 
        id,
        courseId,
        comment,
        firstName,
        lastName,
        accountType,
        mostRecentProfilePicVideo
    } = req.body;

    const generatedID = uuidv4();

    const collection = Connection.db.db("db").collection("learningteachingcourses");

    const newComment = {
        commentText: comment,
        id: generatedID,
        posterPicOrVideo: mostRecentProfilePicVideo,
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        reactions: {
            partying: 0,
            screaming: 0,
            steaming: 0,
            sunglasses: 0,
            tearsOfJoy: 0,
            vomitting: 0
        },
        posterAccountType: accountType,
        poster: id,
        subComments: [],
        posterName: `${firstName} ${lastName}`,
        alreadyReacted: []
    }

    collection.findOneAndUpdate({ id: courseId }, { $push: { comments: newComment }}, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log("err", err);

            resppppp.json({
                message: "Error updating course information and/or comments...",
                err
            })
        } else {
            console.log("result", result);

            resppppp.json({
                message: "Successfully posted comment!",
                updatedComments: result.value.comments
            })
        }
    });
});

module.exports = router;