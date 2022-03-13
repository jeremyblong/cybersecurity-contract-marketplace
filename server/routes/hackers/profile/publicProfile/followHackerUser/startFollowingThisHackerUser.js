const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const { 
        hackerID,
        signedinUserID,
        signedinUserAccountType,
        signedinFullName,
        followerUsername,
        followerJobTitle,
        latestProfilePicVideo
    } = req.body;

    const hackerCollection = Connection.db.db("db").collection("hackers");
    const employerCollection = Connection.db.db("db").collection("employers");

    hackerCollection.findOne({ uniqueId: hackerID }).then((hacker) => {
        if (!hacker) {
            console.log("Hacker does NOT exist or could not be found.");

            resppppp.json({
                message: "Hacker does NOT exist or could not be found."
            })
        } else {

            const generatedID = uuidv4();

            const newFollowAddition = {
                uniqueID: generatedID,
                followerID: signedinUserID,
                followerFullName: signedinFullName,
                followerAccountType: signedinUserAccountType,
                date: new Date(),
                followerUsername,
                followerJobTitle: followerJobTitle !== null ? followerJobTitle : null,
                latestProfilePicVideo,
                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a")
            };
            const newFollowAdditionSignedinUser = {
                uniqueID: generatedID,
                followingID: hackerID,
                followingFullName: `${hacker.firstName} ${hacker.lastName}`,
                followingAccountType: "hackers",
                date: new Date(),
                followingUsername: hacker.username,
                latestProfilePicVideo: typeof hacker.profilePicsVideos !== "undefined" && hacker.profilePicsVideos.length > 0 ? hacker.profilePicsVideos[hacker.profilePicsVideos.length - 1] : null,
                followingJobTitle: typeof hacker.title !== "undefined" && hacker.title !== null ? hacker.title : null,
                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a")
            }

            const matchingOrNot = hacker.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);

            console.log("matchingOrNot", matchingOrNot);

            if (matchingOrNot === -1) {
                // does NOT exist already
                console.log("NOT already following...");

                hacker.currentlyFollowedBy.push(newFollowAddition);

                hackerCollection.save(hacker, async (erorrrrrr, resultttt) => {
                    if (erorrrrrr) {
                        console.log("erorrrrrr saving initial first hacker data :", erorrrrrr);
                        
                        resppppp.json({
                            message: "Unknown error has occurring during the 'new follow' process...",
                            err
                        })
                    } else {
                        console.log("successfully saved initial hacker data...:");

                        // do other logic to signed-in account now...
                        if (signedinUserAccountType === "hackers") {
                            const hackerChanges = await hackerCollection.findOne({ uniqueId: signedinUserID });
        
                            if (hackerChanges !== null) {
        
                                hackerChanges.followingHackers.push(newFollowAdditionSignedinUser);
        
                                hackerCollection.save(hackerChanges, async (error, result) => {
                                    if (error) {
                                        console.log("hackerCollection.saving error ... :", error);

                                        const removePreviousHalfSavedData = await hackerCollection.findOne({ uniqueId: hackerID });

                                        const selectedItemMatch = removePreviousHalfSavedData.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);

                                        removePreviousHalfSavedData.currentlyFollowedBy.splice(selectedItemMatch, 1);

                                        hackerCollection.save(removePreviousHalfSavedData, (errrrrrrr, result) => {
                                            if (errrrrrrr) {
                                                console.log("undo previous changes because of failure failed.");

                                                resppppp.json({
                                                    message: "Unknown error has occurring during the 'new follow' process...",
                                                    err: errrrrrrr
                                                })
                                            } else {
                                                console.log("Successfully rewound saved data after failure.");

                                                resppppp.json({
                                                    message: "Unknown error has occurring during the 'new follow' process..."
                                                })
                                            }
                                        })
                                    } else {
                                        resppppp.json({
                                            message: "Successfully started following this hacker!"
                                        });
                                    }
                                })
                            } else {
                                const removePreviousHalfSavedData = await hackerCollection.findOne({ uniqueId: hackerID });

                                const selectedItemMatch = removePreviousHalfSavedData.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);

                                removePreviousHalfSavedData.currentlyFollowedBy.splice(selectedItemMatch, 1);

                                hackerCollection.save(removePreviousHalfSavedData, (errrrrrrr, result) => {
                                    if (errrrrrrr) {
                                        console.log("undo previous changes because of failure failed.");

                                        resppppp.json({
                                            message: "Unknown error has occurring during the 'new follow' process...",
                                            err: errrrrrrr
                                        })
                                    } else {
                                        console.log("Successfully rewound saved data after failure.");

                                        resppppp.json({
                                            message: "Unknown error has occurring during the 'new follow' process..."
                                        })
                                    }
                                })
                            }
                        } else {
                            const employerChanges = await employerCollection.findOne({ uniqueId: signedinUserID });
        
                            if (employerChanges !== null) {

                                employerChanges.followingHackers.push(newFollowAdditionSignedinUser);
        
                                employerCollection.save(employerChanges, async (error, result) => {
                                    if (error) {
                                        console.log("employerCollection.saving error ... :", error);

                                        const removePreviousHalfSavedData = await hackerCollection.findOne({ uniqueId: hackerID });

                                        const selectedItemMatch = removePreviousHalfSavedData.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);

                                        removePreviousHalfSavedData.currentlyFollowedBy.splice(selectedItemMatch, 1);

                                        hackerCollection.save(removePreviousHalfSavedData, (errrrrrrr, result) => {
                                            if (errrrrrrr) {
                                                console.log("undo previous changes because of failure failed.");

                                                resppppp.json({
                                                    message: "Unknown error has occurring during the 'new follow' process...",
                                                    err: errrrrrrr
                                                })
                                            } else {
                                                console.log("Successfully rewound saved data after failure.");

                                                resppppp.json({
                                                    message: "Unknown error has occurring during the 'new follow' process..."
                                                })
                                            }
                                        })
                                    } else {
                                        resppppp.json({
                                            message: "Successfully started following this hacker!"
                                        });
                                    }
                                })
                            } else {
                                const removePreviousHalfSavedData = await hackerCollection.findOne({ uniqueId: hackerID });

                                const selectedItemMatch = removePreviousHalfSavedData.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);

                                removePreviousHalfSavedData.currentlyFollowedBy.splice(selectedItemMatch, 1);

                                hackerCollection.save(removePreviousHalfSavedData, (errrrrrrr, result) => {
                                    if (errrrrrrr) {
                                        console.log("undo previous changes because of failure failed.");

                                        resppppp.json({
                                            message: "Unknown error has occurring during the 'new follow' process...",
                                            err: errrrrrrr
                                        })
                                    } else {
                                        console.log("Successfully rewound saved data after failure.");

                                        resppppp.json({
                                            message: "Unknown error has occurring during the 'new follow' process..."
                                        })
                                    }
                                })
                            }
                        }
                    }
                })
            } else {
                const findMatchIndex = hacker.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);
                
                hacker.currentlyFollowedBy.splice(findMatchIndex, 1);

                const actionPromise = new Promise(async (resolve, reject) => {
                    // do other logic to signed-in account now...
                    if (signedinUserAccountType === "hackers") {

                        const hackerChanges = await hackerCollection.findOne({ uniqueId: signedinUserID });

                        if (hackerChanges !== null) {
                            const followingIndex = hackerChanges.followingHackers.findIndex((follower) => follower.followerID === signedinUserID);

                            hackerChanges.followingHackers.splice(followingIndex, 1);

                            hackerCollection.save(hackerChanges, (errrrrrrr, result) => {
                                if (errrrrrrr) {
                                    console.log("undo previous changes because of failure failed.");

                                    resolve(false);
                                } else {
                                    console.log("Successfully rewound saved data after failure.");

                                    resolve(true);
                                }
                            })
                        } else {
                            // NO match found.
                            resolve(false);
                        }
                    } else {
                        
                        const employerChanges = await employerCollection.findOne({ uniqueId: signedinUserID });

                        if (employerChanges !== null) {
                            const followingIndex = employerChanges.followingHackers.findIndex((follower) => follower.followerID === signedinUserID);

                            employerChanges.followingHackers.splice(followingIndex, 1);

                            employerCollection.save(employerChanges, (errrrrrrr, result) => {
                                if (errrrrrrr) {
                                    console.log("undo previous changes because of failure failed.");

                                    resolve(false);
                                } else {
                                    console.log("Successfully rewound saved data after failure.");

                                    resolve(true);
                                }
                            })
                        } else {
                            // NO match found.
                            resolve(false);
                        }
                    }
                })

                actionPromise.then((succeeded) => {
                    if (succeeded === true) {
                        hackerCollection.save(hacker, (erorrrrrr, resulllllt) => {
                            if (erorrrrrr) {
                                console.log("erorrrrrr saving initial first hacker data :", erorrrrrr);
                                
                                resppppp.json({
                                    message: "Unknown error has occurring during the 'new follow' process...",
                                    err
                                })
                            } else {
                                console.log("resulllllt", resulllllt);
        
                                resppppp.json({
                                    message: "You've ALREADY followed this user's profile..."
                                })
                            }
                        });
                    } else {
                        resppppp.json({
                            message: "Unknown error has occurring during the 'new follow' process...",
                            err
                        })
                    }
                })
            }
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error has occurring during the 'new follow' process...",
            err
        })
    })
});

module.exports = router;