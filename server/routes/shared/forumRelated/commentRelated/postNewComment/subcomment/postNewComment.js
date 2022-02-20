const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", async (req, resppppp, next) => {
    
    const { signedinUserID, subcomment, selectedCommentID, signedinAccountType, hashtags, subthreadPosterID, subthreadID } = req.body;

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
    
    const mostRecentProfilePicVideo = signedinUserData.profilePicsVideos[signedinUserData.profilePicsVideos.length - 1];

    const { lastName, firstName, accountType, uniqueId } = signedinUserData;
    
    const newCommentAddition = {
        commentText: subcomment,
        id: generatedID,
        posterPicOrVideo: mostRecentProfilePicVideo,
        date: new Date(),
        hashtags,
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
        alreadyReacted: []
    };

    collection.findOne({ $and: [ { "subthreads.subcomments.id": selectedCommentID }, { "subthreads.postedBy": subthreadPosterID } ]}).then((document) => {
        if (!document) {
            console.log("document does NOT exist or could not be found.");

            resppppp.json({
                message: "document does NOT exist or could not be found."
            })
        } else {
            console.log("document", document);
            // find matching subthread index
            const findSubthreadMatch = document.subthreads.findIndex(item => item.id === subthreadID);
            // relvant/matching subthread that change occurred in..
            const relevantSubthread = document.subthreads[findSubthreadMatch];
            // iterate over subthread comments and find match
            const commentMatchIndex = relevantSubthread.subcomments.findIndex(item => item.id === selectedCommentID);
            // select matching/relevant comment - select entire obj
            const commentMatch = relevantSubthread.subcomments[commentMatchIndex];
            // push into subcomments in relevant comment
            commentMatch.subComments.push(newCommentAddition);
            // save document data with update comment
            collection.save(document, (err, result) => {
                if (err) {
                    console.log(err);

                    resppppp.json({
                        message: "Error saving document after successfully changing relevant logic - error.",
                        err
                    })
                } else {
                    console.log("result - success...! : ", result);

                    resppppp.json({
                        message: "Successfully posted a new comment on subthread!",
                        comments: relevantSubthread.subcomments
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
    });
});

module.exports = router;