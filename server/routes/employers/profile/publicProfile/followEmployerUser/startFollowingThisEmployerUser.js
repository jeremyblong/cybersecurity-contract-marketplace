const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const _ = require("lodash");

router.post("/", (req, resppppp, next) => {
    
    const { 
        employerID,
        signedinUserID,
        signedinUserAccountType,
        signedinFullName,
        followerUsername,
        followerJobTitle,
        latestProfilePicVideo
    } = req.body;

    const hackerCollection = Connection.db.db("db").collection("hackers");
    const employerCollection = Connection.db.db("db").collection("employers");

    employerCollection.findOne({ uniqueId: employerID }).then((employer) => {
        if (!employer) {
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
                followingID: employerID,
                followingFullName: `${employer.firstName} ${employer.lastName}`,
                followingAccountType: "employers",
                date: new Date(),
                followingUsername: employer.username,
                latestProfilePicVideo: typeof employer.profilePicsVideos !== "undefined" && employer.profilePicsVideos.length > 0 ? employer.profilePicsVideos[employer.profilePicsVideos.length - 1] : null,
                followingJobTitle: typeof employer.title !== "undefined" && employer.title !== null ? employer.title : null,
                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a")
            }

            const matchingOrNot = employer.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);

            console.log("matchingOrNot", matchingOrNot);

            if (matchingOrNot === -1) {
                // does NOT exist already
                console.log("NOT already following...");

                employer.currentlyFollowedBy.push(newFollowAddition);

                employerCollection.save(employer, async (erorrrrrr, resultttt) => {
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
        
                                hackerChanges.followingCompanies.push(newFollowAdditionSignedinUser);
        
                                hackerCollection.save(hackerChanges, async (error, result) => {
                                    if (error) {
                                        console.log("hackerCollection.saving error ... :", error);

                                        const removePreviousHalfSavedData = await employerCollection.findOne({ uniqueId: employerID });

                                        const selectedItemMatch = removePreviousHalfSavedData.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);

                                        removePreviousHalfSavedData.currentlyFollowedBy.splice(selectedItemMatch, 1);

                                        employerCollection.save(removePreviousHalfSavedData, (errrrrrrr, result) => {
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

                                        const safeEmployerObj = _.omit(employer, ["stripeAccountVerified", "refreshToken", "hash", "salt", "phoneNumber", "stripeAccountDetails", "passbaseIDAccessKey", "paymentMethods", "password", "email", "authStrategy", "activeHiredHackers"])
    
                                        resppppp.json({
                                            message: "Successfully started following this employer!",
                                            employer: safeEmployerObj
                                        });
                                    }
                                })
                            } else {
                                const removePreviousHalfSavedData = await employerCollection.findOne({ uniqueId: employerID });

                                const selectedItemMatch = removePreviousHalfSavedData.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);

                                removePreviousHalfSavedData.currentlyFollowedBy.splice(selectedItemMatch, 1);

                                employerCollection.save(removePreviousHalfSavedData, (errrrrrrr, result) => {
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

                                employerChanges.followingCompanies.push(newFollowAdditionSignedinUser);
        
                                employerCollection.save(employerChanges, async (error, result) => {
                                    if (error) {
                                        console.log("employerCollection.saving error ... :", error);

                                        const removePreviousHalfSavedData = await employerCollection.findOne({ uniqueId: employerID });

                                        const selectedItemMatch = removePreviousHalfSavedData.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);

                                        removePreviousHalfSavedData.currentlyFollowedBy.splice(selectedItemMatch, 1);

                                        employerCollection.save(removePreviousHalfSavedData, (errrrrrrr, result) => {
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
                                        const safeEmployerObj = _.omit(employer, ["stripeAccountVerified", "refreshToken", "hash", "salt", "phoneNumber", "stripeAccountDetails", "passbaseIDAccessKey", "paymentMethods", "password", "email", "authStrategy", "activeHiredHackers"]);
        
                                        resppppp.json({
                                            message: "Successfully started following this employer!",
                                            employer: safeEmployerObj
                                        });
                                    }
                                })
                            } else {
                                const removePreviousHalfSavedData = await employerCollection.findOne({ uniqueId: employerID });

                                const selectedItemMatch = removePreviousHalfSavedData.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);

                                removePreviousHalfSavedData.currentlyFollowedBy.splice(selectedItemMatch, 1);

                                employerCollection.save(removePreviousHalfSavedData, (errrrrrrr, result) => {
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
                const findMatchIndex = employer.currentlyFollowedBy.findIndex((follower) => follower.followerID === signedinUserID);
                
                employer.currentlyFollowedBy.splice(findMatchIndex, 1);

                const actionPromise = new Promise(async (resolve, reject) => {
                    // do other logic to signed-in account now...
                    if (signedinUserAccountType === "hackers") {

                        const hackerChanges = await hackerCollection.findOne({ uniqueId: signedinUserID });

                        if (hackerChanges !== null) {
                            const followingIndex = hackerChanges.followingCompanies.findIndex((follower) => follower.followerID === signedinUserID);

                            hackerChanges.followingCompanies.splice(followingIndex, 1);

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
                            const followingIndex = employerChanges.followingCompanies.findIndex((follower) => follower.followerID === signedinUserID);

                            employerChanges.followingCompanies.splice(followingIndex, 1);

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
                        employerCollection.save(employer, (erorrrrrr, resulllllt) => {
                            if (erorrrrrr) {
                                console.log("erorrrrrr saving initial first hacker data :", erorrrrrr);
                                
                                resppppp.json({
                                    message: "Unknown error has occurring during the 'new follow' process...",
                                    err
                                })
                            } else {
                                console.log("resulllllt", resulllllt);

                                const safeEmployerObj = _.omit(employer, ["stripeAccountVerified", "refreshToken", "hash", "salt", "phoneNumber", "stripeAccountDetails", "passbaseIDAccessKey", "paymentMethods", "password", "email", "authStrategy", "activeHiredHackers"]);
        
                                resppppp.json({
                                    message: "You've ALREADY followed this user's profile...",
                                    employer: safeEmployerObj
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