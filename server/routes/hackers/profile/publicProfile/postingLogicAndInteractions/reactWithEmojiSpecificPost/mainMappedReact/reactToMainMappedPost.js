const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');


router.post("/", (req, resppppp, next) => {

    const { relatedPostID, posterID, reactorID, reaction } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId: posterID }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);
            // construct addition if necessary
            const newReactionAddition = {
                id: uuidv4(),
                responder: reactorID,
                response: reaction
            }
            // find relevant post..
            const findMatchingPostIndex = user.profilePosts.findIndex((post) => post.uniqueId === relatedPostID);
            console.log("findMatchingPostIndex", findMatchingPostIndex);
            const selectedPost = user.profilePosts[findMatchingPostIndex];
            // check for previous reactions
            const alreadyReactedOrNot = selectedPost.alreadyReacted.findIndex((resp) => resp.responder === reactorID);
            console.log("alreadyReactedOrNot", alreadyReactedOrNot);
            // check for match if already reacted
            if (alreadyReactedOrNot === -1) {
                console.log("not reacted yet!");
                // has NOT already reacted - add reaction.
                // add one to approriate reaction
                selectedPost.reactions[reaction] += 1;
                // push into already reacted array for analyzing later (detect whether already reacted...)
                selectedPost.alreadyReacted.push(newReactionAddition);
                // save changes
                collection.save(user, (errorrrrrrr, resulttt) => {
                    if (errorrrrrrr) {
                        console.log("error saving!!", errorrrrrrr);

                        // return final response/confirmation
                        resppppp.json({
                            message: "An error occurred while attempting to save/update the required information!",
                            err: errorrrrrrr
                        })
                    } else {
                        console.log("successfully saved...!", resulttt);
                        // return final response/confirmation
                        resppppp.json({
                            message: "Successfully reacted to post!",
                            posts: user.profilePosts
                        })
                    }
                })
            } else {
                console.log("already reacted previously!");
                // find the previous matching reaction from reactor and decount by 1
                selectedPost.reactions[selectedPost.alreadyReacted[alreadyReactedOrNot].response] -= 1;
                // has ALREADY reacted - SUBTRACT previous reaction.
                const filteredOutPreviousReaction = selectedPost.alreadyReacted.filter((x) => x.responder !== reactorID);
                // update and/or change user object to reflect filtered changes upon save below..
                selectedPost.alreadyReacted = filteredOutPreviousReaction;
                // save changes
                collection.save(user, (errorrrrrrr, resulttt) => {
                    if (errorrrrrrr) {
                        console.log("error saving!!", errorrrrrrr);

                        // return final response/confirmation
                        resppppp.json({
                            message: "An error occurred while attempting to save/update the required information!",
                            err: errorrrrrrr
                        })
                    } else {
                        console.log("successfully saved...!", resulttt);
                        // return final response/confirmation
                        resppppp.json({
                            message: "Successfully REMOVED reaction to post!",
                            posts: user.profilePosts
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