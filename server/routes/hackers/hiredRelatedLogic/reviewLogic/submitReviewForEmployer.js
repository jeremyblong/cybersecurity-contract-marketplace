const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const _ = require("lodash");


router.post("/", async (req, resppppp, next) => {
    
    const { 
        accessCode,
        fullName,
        id, // signed-in user ID
        releventAssociatedContractID, // contract hired job ID
        rating,  // rating data review data
        reviewText,
        picOrVideo,
        employerID
    } = req.body;

    const hackerResults = Connection.db.db("db").collection("hackers");
    const employerResults = Connection.db.db("db").collection("employers");

    const hackerData = await hackerResults.findOne({ uniqueId: id });
    const employerData = await employerResults.findOne({ uniqueId: employerID });

    if (employerData !== null && hackerData !== null) {
        // found employer account..
        console.log("FOUND employer account..");

        const hackerFindIndexMatch = hackerData.activeHiredHackingJobs.findIndex((item) => item.generatedID === releventAssociatedContractID);

        const hackerJobMatch = hackerData.activeHiredHackingJobs[hackerFindIndexMatch]; 

        const employerFindIndexMatch = employerData.activeHiredHackers.findIndex((item) => item.generatedID === releventAssociatedContractID);

        const employerJobMatch = employerData.activeHiredHackers[employerFindIndexMatch]; 

        if (accessCode === hackerJobMatch.generatedAccessKeyReview) {
            // code STILL matches
            const newReviewAddition = {
                id: uuidv4(),
                date: new Date(),
                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                validated: false,
                validationDate: null,
                reviewerID: id,
                reviewerName: fullName,
                rating,
                reviewText,
                reviewerPicOrVideo: picOrVideo
            };

            employerJobMatch["hackerHasReviewedEmployerAlready"] = true;

            // push into reviews array
            if (_.has(employerData, "reviews")) {
                employerData.reviews.push(newReviewAddition);
            } else {
                employerData["reviews"] = [newReviewAddition];
            }
            // save newly added-data
            employerResults.save(employerData, (err, result) => {
                if (err) {
                    console.log("err", err);
    
                    resppppp.json({
                        message: "Error occurred while attempting to save new data..",
                        err
                    })
                } else {
                    console.log("result", result);

                    hackerData.activeHiredHackingJobs.splice(hackerFindIndexMatch, 1);

                    if (_.has(hackerData, "archivedJobs")) {
                        hackerData.archivedJobs.push(hackerJobMatch);
                    } else {
                        hackerData["archivedJobs"] = [hackerJobMatch];
                    }

                    // save newly added-data
                    hackerResults.save(hackerData, (err, result) => {
                        if (err) {
                            console.log("err", err);

                            resppppp.json({
                                message: "Error occurred while attempting to save new data..",
                                err
                            })
                        } else {
                            console.log("result", result);

                            resppppp.json({
                                message: "Successfully submitted your new review!"
                            })
                        }
                    })
                }
            })
        } else {
            resppppp.json({
                message: "Code does NOT match, try again!"
            })
        }
    } else {
        console.log("did NOT find employer account..");

        resppppp.json({
            message: "Could NOT locate BOTH users data.."
        })
    }
});

module.exports = router;