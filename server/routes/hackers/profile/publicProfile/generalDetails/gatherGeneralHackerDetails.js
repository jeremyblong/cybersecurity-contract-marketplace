const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const _ = require("lodash");


router.post("/", (req, resppppp, next) => {
    
    const { 
        userID,
        result, 
        modified,
        signedinUserID
    } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId: userID }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            if (modified === true) {
                // user has NOT alredy viewed this person's profile
                user.recentlyViewedProfileViews.push(result);
                // increase view count...
                user.totalUniqueViews += 1;
                // save this newly added data
                collection.save(user, (savingError, result) => {
                    if (savingError) {
                        console.log("error saving...:", savingError);

                        resppppp.json({
                            message: "Error saving data to database - check error code.",
                            err: savingError
                        })
                    } else {
                        console.log("SUCCESSFULLY saved!");
                        // return response
                        resppppp.json({
                            message: "Gathered & updated the required data (IF applicable)...",
                            user: _.omit(user, ['authStrategy', 'currentAddress', 'email', 'hash', 'password', 'paymentMethods', 'previouslyAppliedJobs', 'refreshToken', 'userLatestLocation', 'salt', 'stripeAccountDetails', 'notifications']),
                            modified
                        })
                    }
                })
            } else {
                // user has ALREADY viewed this person's profile
                resppppp.json({
                    message: "Gathered & updated the required data (IF applicable)...",
                    user: _.omit(user, ['authStrategy', 'currentAddress', 'email', 'hash', 'password', 'paymentMethods', 'previouslyAppliedJobs', 'refreshToken', 'userLatestLocation', 'salt', 'stripeAccountDetails', 'notifications']),
                    modified
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