const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const _ = require("lodash");
const { collection } = require("../../../../schemas/authentication/register.js");


router.post("/", async (req, resppppp, next) => {
    
    const { 
        uniqueId,
        generatedID,
        submitted,
        employerPosterId
    } = req.body;

    const { 
        description,
        title,
        impact,
        severity,
        vul,
        relatedAttackSurface,
        files 
    } = submitted;

    const hackerCollection = Connection.db.db("db").collection("hackers");
    const employerCollection = Connection.db.db("db").collection("employers");

    const newWorkSubmission = {
        id: uuidv4(),
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        data: {
            proofOfConceptDesc: description,
            proofOfConceptTitle: title,
            proofOfConceptImpact: impact,
            severity,
            vul,
            relatedAttackSurface,
            files
        },
        responses: [],
        confirmedViewed: false,
        approval: false,
        inReviewStage: true
    }

    const hackerResults = await hackerCollection.findOne({ uniqueId });
    const employerResults = await employerCollection.findOne({ uniqueId: employerPosterId });

    if (employerResults !== null) {
        const matchingIndex = employerResults.activeHiredHackers.findIndex((item) => item.generatedID === generatedID);
        const hackerMatchingIndexItem = hackerResults.activeHiredHackingJobs.findIndex((item) => item.generatedID === generatedID);

        const employerJobMatch = employerResults.activeHiredHackers[matchingIndex];
        const hackerJobMatch = hackerResults.activeHiredHackingJobs[hackerMatchingIndexItem];
        
        if (_.has(employerJobMatch, "updatesAndSubmissions")) {
            employerJobMatch.updatesAndSubmissions.push(newWorkSubmission);

            employerCollection.save(employerResults, (errorSaving, result) => {
                if (errorSaving) {
                    console.log("error saving", errorSaving);
                } else {
                    console.log("result", result);

                    if (_.has(hackerJobMatch, "updatesAndSubmissions")) {
                        hackerJobMatch.updatesAndSubmissions.push(newWorkSubmission);

                        hackerCollection.save(hackerResults, (errSavingInner, resultInner) => {
                            if (errSavingInner) {
                                console.log("errSavingInner", errSavingInner);

                                resppppp.json({
                                    message: "An unknown or private error has occurred."
                                })
                            } else {
                                console.log("resultInner", resultInner);

                                resppppp.json({
                                    message: "Successfully submitted data!"
                                })
                            }
                        })
                    } else {
                        hackerJobMatch["updatesAndSubmissions"] = [newWorkSubmission];

                        hackerCollection.save(hackerResults, (errSavingInner, resultInner) => {
                            if (errSavingInner) {
                                console.log("errSavingInner", errSavingInner);

                                resppppp.json({
                                    message: "An unknown or private error has occurred."
                                })
                            } else {
                                console.log("resultInner", resultInner);

                                resppppp.json({
                                    message: "Successfully submitted data!"
                                })
                            }
                        })
                    }
                }
            })
        } else {
            employerJobMatch["updatesAndSubmissions"] = [newWorkSubmission];

            employerCollection.save(employerResults, (errorSaving, result) => {
                if (errorSaving) {
                    console.log("error saving", errorSaving);
                } else {
                    console.log("result", result);

                    if (_.has(hackerJobMatch, "updatesAndSubmissions")) {
                        hackerJobMatch.updatesAndSubmissions.push(newWorkSubmission);

                        hackerCollection.save(hackerResults, (errSavingInner, resultInner) => {
                            if (errSavingInner) {
                                console.log("errSavingInner", errSavingInner);

                                resppppp.json({
                                    message: "An unknown or private error has occurred."
                                })
                            } else {
                                console.log("resultInner", resultInner);

                                resppppp.json({
                                    message: "Successfully submitted data!"
                                })
                            }
                        })
                    } else {
                        hackerJobMatch["updatesAndSubmissions"] = [newWorkSubmission];

                        hackerCollection.save(hackerResults, (errSavingInner, resultInner) => {
                            if (errSavingInner) {
                                console.log("errSavingInner", errSavingInner);

                                resppppp.json({
                                    message: "An unknown or private error has occurred."
                                })
                            } else {
                                console.log("resultInner", resultInner);

                                resppppp.json({
                                    message: "Successfully submitted data!"
                                })
                            }
                        })
                    }
                }
            })
        }
    } else {
        resppppp.json({
            message: "An unknown or private error has occurred."
        })
    }
});

module.exports = router;