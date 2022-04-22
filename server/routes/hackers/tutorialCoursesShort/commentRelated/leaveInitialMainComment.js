const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp, next) => {

    const { tutorialID, accountType, signedinUserNameFull, signedinLastProfileFile, commentText, signedinUserID } = req.body;

    const generatedID = uuidv4();

    const collection = Connection.db.db("db").collection("tutorialshorts");

    const newComment = {
        commentText,
        id: generatedID,
        posterPicOrVideo: signedinLastProfileFile,
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
        poster: signedinUserID,
        subComments: [],
        posterName: signedinUserNameFull,
        alreadyReacted: []
    };

    collection.findOneAndUpdate({ id: tutorialID }, { $push: { comments: newComment }}, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log("err", err);

            resppppp.json({
                message: "Error updating course information and/or comments...",
                err
            })
        } else {
            console.log("result", result);

            resppppp.json({
                message: "Successfully left your comment on this video!",
                tutorial: result.value
            })
        }
    });
});

module.exports = router;