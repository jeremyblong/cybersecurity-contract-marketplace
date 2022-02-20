const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", async (req, resppppp, next) => {
    
    const { subthreadPosterID, commentText, subthreadID, signedinUserID, signedinAccountType, hashtags } = req.body;

    const collection = Connection.db.db("db").collection("forumcommunities");
    const employerOrHackerCollection = Connection.db.db("db").collection(signedinAccountType);

    const signedinUserData = await employerOrHackerCollection.findOne({ uniqueId: signedinUserID }, { fields: {
        firstName: 1,
        lastName: 1,
        username: 1,
        profilePicsVideos: 1,
        uniqueId: 1,
        accountType: 1
    }});

    const generatedID = uuidv4();

    console.log("signedinUserData", signedinUserData);
    
    const mostRecentProfilePicVideo = signedinUserData.profilePicsVideos[signedinUserData.profilePicsVideos.length - 1];

    const { lastName, firstName, accountType, uniqueId } = signedinUserData;
    
    const newCommentAddition = {
        commentText: commentText,
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
        poster: uniqueId,
        subComments: [],
        posterName: `${firstName} ${lastName}`,
        alreadyReacted: [],
        hashtags
    };

    collection.findOneAndUpdate({ $and: [ { "subthreads.id": subthreadID }, { "subthreads.postedBy": subthreadPosterID } ]}, { $push: { "subthreads.$.subcomments": newCommentAddition }}, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log("Could NOT locate approriate document & made no edits/changes...");

            resppppp.json({
                message: "Could NOT locate approriate document & made no edits/changes..."
            })
        } else {
            console.log("result", result.value);

            const matchingThread = result.value.subthreads.findIndex((thread) => thread.id === subthreadID);

            const matchedComments = result.value.subthreads[matchingThread].subcomments;

            resppppp.json({
                message: "Successfully posted a new comment on subthread!",
                comments: matchedComments
            })
        }
    });
});

module.exports = router;