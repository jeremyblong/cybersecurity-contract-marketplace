const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');

router.post("/", (req, resppppp, next) => {
    
    const { 
        hackerID,
        signedinUserID,
        signedinUserAccountType,
        fullName
    } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId: hackerID }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User could NOT be found - no action taken."
            })
        } else {
            console.log("user", user);

            const matchingIndex = user.profileLovesHearts.findIndex((item) => item.responderID === signedinUserID);

            console.log("matchingIndex", matchingIndex);

            const newAdditionSave = {
                responderID: signedinUserID,
                id: uuidv4(),
                date: new Date(),
                responderName: fullName,
                accountTypeOfReactor: signedinUserAccountType
            }

            if (matchingIndex === -1) {
                // does NOT exist...
                user.profileLovesHearts.push(newAdditionSave);

                collection.save(user, (error, result) => {
                    if (error) {
                        console.log("error", error);

                        resppppp.json({
                            message: "An error occurred while attempting to appropriatly modify existing data..."
                        })
                    } else {

                        resppppp.json({
                            message: "Successfully 'reacted/hearted' this person's profile & the changes are now active and should reflect any additional responses appropriately!",
                            activeHearts: user.profileLovesHearts
                        })
                    }
                })
            } else {
                const filtered = user.profileLovesHearts.filter((item) => item.responderID !== signedinUserID);

                user.profileLovesHearts = filtered;

                collection.save(user, (error, result) => {
                    if (error) {
                        console.log("error", error);

                        resppppp.json({
                            message: "An error occurred while attempting to appropriatly modify existing data..."
                        })
                    } else {

                        resppppp.json({
                            message: "You've already 'hearted' or 'liked' this person's profile - We automatically 'un-like' a profile if you like it and have already responded with a like...",
                            activeHearts: user.profileLovesHearts
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