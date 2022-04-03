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
        hackerID
    } = req.body;

    const hackerResults = Connection.db.db("db").collection("hackers");
    const employerResults = Connection.db.db("db").collection("employers");

    const hackerData = await hackerResults.findOne({ uniqueId: hackerID });
    const employerData = await employerResults.findOne({ uniqueId: id });

    if (employerData !== null && hackerData !== null) {
        // found employer account..
        console.log("FOUND employer account..");

        const hackerFindIndexMatch = hackerData.activeHiredHackingJobs.findIndex((item) => item.generatedID === releventAssociatedContractID);

        const hackerJobMatch = hackerData.activeHiredHackingJobs[hackerFindIndexMatch]; 

        const employerFindIndexMatch = employerData.activeHiredHackers.findIndex((item) => item.generatedID === releventAssociatedContractID);

        const employerJobMatch = employerData.activeHiredHackers[employerFindIndexMatch]; 

        if (accessCode === employerJobMatch.generatedAccessKeyReview) {
            // code STILL matches
            if (_.has(employerData, "hackerHasReviewedEmployerAlready") && employerData.hackerHasReviewedEmployerAlready === true) {

                const findReviewIndex = employerData.reviews.findIndex((review) => review.associatedGeneratedID === releventAssociatedContractID);

                const foundReview = employerData.reviews[findReviewIndex];

                foundReview["validated"] = true;
                foundReview["validationDate"] = new Date();

                const newReviewAddition = {
                    id: uuidv4(),
                    date: new Date(),
                    dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                    validated: true,
                    validationDate: new Date(),
                    reviewerID: id,
                    reviewerName: fullName,
                    rating,
                    reviewText,
                    reviewerPicOrVideo: picOrVideo,
                    associatedGeneratedID: releventAssociatedContractID
                };
    
                if (hackerFindIndexMatch !== -1) {
                    hackerJobMatch["employerHasReviewedHackerAlready"] = true;

                    // push into reviews array
                    if (_.has(hackerData, "reviews")) {
                        hackerData.reviews.push(newReviewAddition);
                    } else {
                        hackerData["reviews"] = [newReviewAddition];
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
        
                            employerData.activeHiredHackers.splice(employerFindIndexMatch, 1);
        
                            if (_.has(employerData, "archivedJobs")) {
                                employerData.archivedJobs.push(employerJobMatch);
                            } else {
                                employerData["archivedJobs"] = [employerJobMatch];
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
        
                                    resppppp.json({
                                        message: "Successfully submitted your new review!"
                                    })
                                }
                            })
                        }
                    })
                } else {
                    // push into reviews array
                    if (_.has(hackerData, "reviews")) {
                        hackerData.reviews.push(newReviewAddition);
                    } else {
                        hackerData["reviews"] = [newReviewAddition];
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

                            employerData.activeHiredHackers.splice(employerFindIndexMatch, 1);

                            if (_.has(employerData, "archivedJobs")) {
                                employerData.archivedJobs.push(employerJobMatch);
                            } else {
                                employerData["archivedJobs"] = [employerJobMatch];
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

                                    resppppp.json({
                                        message: "Successfully submitted your new review!"
                                    })
                                }
                            })
                        }
                    })
                }
            } else {
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
                    reviewerPicOrVideo: picOrVideo,
                    associatedGeneratedID: releventAssociatedContractID
                };

                if (hackerFindIndexMatch !== -1) {
                    hackerJobMatch["employerHasReviewedHackerAlready"] = true;

                    // push into reviews array
                    if (_.has(hackerData, "reviews")) {
                        hackerData.reviews.push(newReviewAddition);
                    } else {
                        hackerData["reviews"] = [newReviewAddition];
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
        
                            employerData.activeHiredHackers.splice(employerFindIndexMatch, 1);
        
                            if (_.has(employerData, "archivedJobs")) {
                                employerData.archivedJobs.push(employerJobMatch);
                            } else {
                                employerData["archivedJobs"] = [employerJobMatch];
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
        
                                    resppppp.json({
                                        message: "Successfully submitted your new review!"
                                    })
                                }
                            })
                        }
                    })
                } else {
                    // push into reviews array
                    if (_.has(hackerData, "reviews")) {
                        hackerData.reviews.push(newReviewAddition);
                    } else {
                        hackerData["reviews"] = [newReviewAddition];
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

                            employerData.activeHiredHackers.splice(employerFindIndexMatch, 1);

                            if (_.has(employerData, "archivedJobs")) {
                                employerData.archivedJobs.push(employerJobMatch);
                            } else {
                                employerData["archivedJobs"] = [employerJobMatch];
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

                                    resppppp.json({
                                        message: "Successfully submitted your new review!"
                                    })
                                }
                            })
                        }
                    })
                }
            }
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