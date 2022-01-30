const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", (req, resppppp, next) => {
    
    const { 
        reaction, // actual reaction itself
        reactHackerAccountID, // other user's ID
        reactedHackerFile, // reacting file
        reactingSignedinUserID // signed in user ID
    } = req.body;

    // console.log(req.body);

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId: reactHackerAccountID }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            // find which item matches currently selected item
            const matchingIndex = user.profilePicsVideos.findIndex((item) => item.id === reactedHackerFile.core.id);
            // pull "out" matching item...
            const selectedItem = user.profilePicsVideos[matchingIndex];
            // check if this user has ALREADY Reacted to this particular post/image/video
            if (selectedItem.alreadyReacted.some(x => x.responder === reactingSignedinUserID)) {
                console.log("already exists...!");
                // find response from this user in the "alreadyReacted" array..
                const alreadyReactedIndex = selectedItem.alreadyReacted.findIndex(a => a.responder === reactingSignedinUserID);
                // remove ONE(1) from reaction count...
                selectedItem.reactions[selectedItem.alreadyReacted[alreadyReactedIndex].response] -= 1;
                // cut-out the match from above
                selectedItem.alreadyReacted.splice(alreadyReactedIndex, 1);
                // update and re-assign user.profilePicsVideos array
                user.profilePicsVideos[matchingIndex] = selectedItem;
                // save updates...
                collection.save(user, (errorrrr, result) => {
                    if (errorrrr) {
                        console.log("errorrrr", errorrrr);

                        resppppp.json({
                            message: "Error occurred while attempting to save appropriate changes...",
                            err: errorrrr
                        })
                    } else {
                        console.log("Successfully saved!", result);  
                        
                        resppppp.json({
                            message: "You've already PREVIOUSLY reacted to this post! We are revoking/removing your previous response to allow for a new response - please try your action again!"
                        })
                    }
                })
            } else {
                console.log("does NOT already exist.");
                // has NOT already reacted so add one to appropriate reaction count.
                selectedItem.reactions[reaction] += 1;
                // create new-to-push obj
                const createNewReaction = {
                    id: uuidv4(),
                    responder: reactingSignedinUserID,
                    response: reaction
                }
                // add user to "alreadyReacted" array
                selectedItem.alreadyReacted.push(createNewReaction);
                // update and re-assign user.profilePicsVideos array
                user.profilePicsVideos[matchingIndex] = selectedItem;
                // save updates...
                collection.save(user, (errorrrr, result) => {
                    if (errorrrr) {
                        console.log("errorrrr", errorrrr);

                        resppppp.json({
                            message: "Error occurred while attempting to save appropriate changes...",
                            err: errorrrr
                        })
                    } else {
                        console.log("Successfully saved!", result);  
                        
                        resppppp.json({
                            message: "Successfully reacted to file!"
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