const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');


router.post("/", (req, resppppp, next) => {
    
    const { 
        signedinUserID,
        reaction,
        forum,
        accountType
    } = req.body;

    console.log("forum", forum);

    const collection = Connection.db.db("db").collection("forumcommunities");

    collection.findOne({ "subthreads.id": forum.id }).then((thread) => {
        if (!thread) {
            console.log("Thread does NOT exist or could not be found.");

            resppppp.json({
                message: "Thread does NOT exist or could not be found."
            })
        } else {
            console.log("thread", thread);     
            // find index of matching/relevant thread    
            const findThreadIndex = thread.subthreads.findIndex((item) => item.id === forum.id);
            // select relevant matching thread
            const selectedThread = thread.subthreads[findThreadIndex];
            // relevant thread reactions object
            const reactions = selectedThread.reactionsToMainPost;   
            // check if already reacted to post/forum
            if (selectedThread.peopleAlreadyReacted.some(x => x.responder === signedinUserID)) {
                // has ALREADY REACTED!
                let previousReaction = null;                
                // remove reaction person from peopleAlreadyReacted array..
                selectedThread.peopleAlreadyReacted = selectedThread.peopleAlreadyReacted.filter((each) => {
                    if (each.responder === signedinUserID) {
                        previousReaction = each.reaction;
                        return false;
                    } else {
                        return true;
                    }
                });
                // remove reaction number from obj first to detect reaction type
                reactions[previousReaction] -= 1;
                // save new updated data!
                collection.save(thread, (errorrrrr, result) => {
                    if (errorrrrr) {
                        console.log("errorrrrr saving...:", errorrrrr);

                        resppppp.json({
                            message: "Error attempting to save updated user information!",
                            terr: errorrrrr
                        })
                    } else {
                        console.log("successfully SAVED!...:", result);

                        resppppp.json({
                            message: "Successfully reacted to forum post!",
                            reactions
                        })
                    }
                })
            } else {
                // HAS NOT already reacted...
                const newReactionAlreadyReacted = {
                    id: uuidv4(),
                    responder: signedinUserID,
                    reaction
                };
                selectedThread.peopleAlreadyReacted.push(newReactionAlreadyReacted);
                reactions[reaction] += 1;
                // save newly updated data!
                collection.save(thread, (errorrrrr, result) => {
                    if (errorrrrr) {
                        console.log("errorrrrr saving...:", errorrrrr);

                        resppppp.json({
                            message: "Error attempting to save updated user information!",
                            terr: errorrrrr
                        })
                    } else {
                        console.log("successfully SAVED!...:", result);

                        resppppp.json({
                            message: "Successfully reacted to forum post!",
                            reactions
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