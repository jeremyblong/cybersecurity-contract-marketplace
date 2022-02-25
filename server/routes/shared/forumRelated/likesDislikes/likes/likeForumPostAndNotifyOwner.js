const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const { 
        signedinUserID,
        communitityID
    } = req.body;

    const collection = Connection.db.db("db").collection("forumcommunities");

    collection.findOne({ "subthreads.id": communitityID }).then((thread) => {
        if (!thread) {
            console.log("Thread does NOT exist or could not be found.");

            resppppp.json({
                message: "Thread does NOT exist or could not be found."
            })
        } else {
            console.log("thread", thread);     
            // find index of matching/relevant thread    
            const findThreadIndex = thread.subthreads.findIndex((item) => item.id === communitityID);
            // select relevant matching thread
            const selectedThread = thread.subthreads[findThreadIndex];
            // check if user has already reacted with a like/dislike already or not
            const alreadyReactedLikes = selectedThread.likes.findIndex((item) => item.responder === signedinUserID);
            const alreadyReactedDislikes = selectedThread.dislikes.findIndex((item) => item.responder === signedinUserID);

            if (alreadyReactedDislikes === -1 && alreadyReactedLikes === -1) {
                // has NOT already reacted - allow reaction!

                const newReaction = {
                    id: uuidv4(),
                    responder: signedinUserID,
                    date: new Date(),
                    dateFormatted: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a")
                }
                selectedThread.likes.push(newReaction);

                collection.save(thread, (err, saved) => {
                    if (err) {
                        console.log("Err saving...:", err);

                        resppppp.json({
                            message: "An error occurred while attempting to save modified data...",
                            err
                        })
                    } else {
                        console.log("Saved", saved);

                        resppppp.json({
                            message: "Successfully liked this forum post!",
                            updated: selectedThread.likes,
                            likes: true
                        })
                    }
                })
            } else {
                // already reacted! do NOT allow reaction...
                // check which array (likes/dislikes) to remove previous reaction from
                if (alreadyReactedLikes > -1) {
                    // reacted with a "like"..
                    // remove previous response from reacted array
                    selectedThread.likes = selectedThread.likes.filter((item) => item.responder !== signedinUserID);
                    // save user updated data...
                    collection.save(thread, (err, saved) => {
                        if (err) {
                            console.log("Err saving...:", err);

                            resppppp.json({
                                message: "An error occurred while attempting to save modified data...",
                                err
                            })
                        } else {
                            console.log("Saved", saved);

                            resppppp.json({
                                message: "Successfully removed response from post!",
                                updated: selectedThread.likes,
                                likes: true
                            })
                        }
                    })
                } else if (alreadyReactedDislikes > -1) {
                    // reacted with a "dislike"..
                    // remove previous response from reacted array
                    selectedThread.dislikes = selectedThread.dislikes.filter((item) => item.responder !== signedinUserID);
                    // save user updated data...
                    collection.save(thread, (err, saved) => {
                        if (err) {
                            console.log("Err saving...:", err);

                            resppppp.json({
                                message: "An error occurred while attempting to save modified data...",
                                err
                            })
                        } else {
                            console.log("Saved", saved);

                            resppppp.json({
                                message: "Successfully removed response from post!",
                                updated: selectedThread.dislikes,
                                likes: false
                            })
                        }
                    })
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