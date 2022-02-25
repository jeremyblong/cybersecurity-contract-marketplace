const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { subthreadPosterID, subthreadID } = req.query;

    const collection = Connection.db.db("db").collection("forumcommunities");

    collection.findOne({ $and: [ { "subthreads.id": subthreadID }, { "subthreads.postedBy": subthreadPosterID } ]}).then((thread) => {
        if (!thread) {
            console.log("community does NOT exist or could not be found.");

            resppppp.json({
                message: "Unknown error has occurred while attempting to fetch relevant comments..."
            })
        } else {
            console.log("thread", thread);

            const indexed = thread.subthreads.findIndex(group => group.id === subthreadID);

            const subthreadComments = thread.subthreads[indexed].subcomments;

            resppppp.json({
                message: "Successfully gathered subthread comments!",
                comments: subthreadComments
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

// subthreadID: id, 
// subthreadPosterID: poster,
// signedinUserID: userData.uniqueId,
// signedinUserAccountType: userData.accountType 