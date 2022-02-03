const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", (req, resppppp, next) => {
    // id is signed in user (commenter) ID
    // listingId is the employer listing identification string
    // comment is what the signed in user is posting..
    const { 
        id, 
        specificPostId, 
        comment, 
        firstName, 
        lastName,
        accountType, 
        mostRecentProfilePicVideo, 
        profileID
    } = req.body;

    const generatedID = uuidv4();

    const collection = Connection.db.db("db").collection("hackers");

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

    collection.findOneAndUpdate({ uniqueId: profileID, "profilePosts.uniqueId": specificPostId }, { $push: { "profilePosts.$.comments": newComment }}, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log("err", err);

            resppppp.json({
                message: "Error updating course information and/or comments...",
                err
            })
        } else {

            const profilePostsVariable = result.value.profilePosts;

            const matchingIndex = profilePostsVariable.findIndex((x) => x.uniqueId === specificPostId);

            const newlyCreatedCommentArray = profilePostsVariable[matchingIndex].comments;

            resppppp.json({
                message: "Successfully posted comment!",
                updatedComments: newlyCreatedCommentArray,
                posts: result.value.profilePosts
            })
        }
    });
});

module.exports = router;


// id: userData.uniqueId,
// specificPostId: selectedPost.uniqueId,
// comment,
// firstName: userData.firstName,
// lastName: userData.lastName,
// accountType: userData.accountType,
// mostRecentProfilePicVideo: typeof userData.profilePicsVideos !== "undefined" && userData.profilePicsVideos.length > 0 ? userData.profilePicsVideos[userData.profilePicsVideos.length - 1] : null