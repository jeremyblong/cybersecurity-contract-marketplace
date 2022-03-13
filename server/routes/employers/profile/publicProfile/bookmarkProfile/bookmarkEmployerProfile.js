const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const _ = require("lodash");


router.post("/", (req, resppppp, next) => {
    
    const { employerID, signedinUserID, signedinUserAccountType } = req.body;

    const employersCollection = Connection.db.db("db").collection("employers");
    const matchingCollection = Connection.db.db("db").collection(signedinUserAccountType);

    const matchingHackerDataRestricted = employersCollection.findOne({ uniqueId: employerID }, { fields: {
        firstName: 1,
        lastName: 1, 
        username: 1,
        accountType: 1,
        uniqueId: 1,
        registrationDate: 1,
        completedJobs: 1,
        reviews: 1,
        fullyVerified: 1,
        points: 1,
        profilePicsVideos: 1,
        profileBannerImage: 1
    }}).then((user) => user);
    // other user's data...
    matchingHackerDataRestricted.then((employerUser) => {
        // reacting/signed-in user data..
        matchingCollection.findOne({ uniqueId: signedinUserID }).then((user) => {
            if (!user) {
                console.log("User does NOT exist or could not be found.");
    
                resppppp.json({
                    message: "User does NOT exist or could not be found."
                })
            } else {

                const matching = user.bookmarkedProfiles.findIndex(item => item.uniqueId === employerUser.uniqueId);
                
                if (matching === -1) {
                    // does NOT exist
                    if (_.has(user, "bookmarkedProfiles")) {
                        user.bookmarkedProfiles.push(employerUser);
                    } else {
                        user["bookmarkedProfiles"] = [employerUser]
                    }
                    // save changed data
                    matchingCollection.save(user, (innerError, result) => {
                        if (innerError) {
                            console.log("inner saving error ... :", innerError);
                            // return response
                            resppppp.json({
                                message: "Error saving database information and/or changes...",
                                err: innerError
                            })
                        } else {
                            console.log("result", result);
                            // return response
                            resppppp.json({
                                message: "Successfully 'bookmarked' this employers's profile!",
                                result
                            })
                        }
                    })
                } else {
                    // already exists
                    resppppp.json({
                        message: "You've ALREADY bookmarked this user's profile...",
                        user
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
});

module.exports = router;