const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.post("/", (req, resppppp, next) => {
    
    const { hackerID, signedinUserID, signedinUserAccountType } = req.body;

    const hackerCollection = Connection.db.db("db").collection("hackers");
    const matchingCollection = Connection.db.db("db").collection(signedinUserAccountType);

    const matchingHackerDataRestricted = hackerCollection.findOne({ uniqueId: hackerID }, { fields: {
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
    matchingHackerDataRestricted.then((hackerUser) => {
        // reacting/signed-in user data..
        matchingCollection.findOne({ uniqueId: signedinUserID }).then((user) => {
            if (!user) {
                console.log("User does NOT exist or could not be found.");
    
                resppppp.json({
                    message: "User does NOT exist or could not be found."
                })
            } else {

                const matching = user.bookmarkedProfiles.findIndex(item => item.uniqueId === hackerUser.uniqueId);
                
                if (matching === -1) {
                    // does NOT exist
                    user.bookmarkedProfiles.push(hackerUser);
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
                                message: "Successfully 'hearted' this hacker's profile!",
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

// "Could not make appropriate changes and/or find the appropriate user's..."