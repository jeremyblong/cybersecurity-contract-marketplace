const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const _ = require("lodash");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));


router.post("/", async (req, resppppp, next) => {
    
    const { signedinUserID, employerID, generatedID } = req.body;

    const hackerCollection = Connection.db.db("db").collection("hackers");
    const employerCollection = Connection.db.db("db").collection("employers");

    const hackerResults = await hackerCollection.findOne({ uniqueId: signedinUserID });
    const employerResults = await employerCollection.findOne({ uniqueId: employerID });

    const newRequestedJobConfirmation = {
        id: uuidv4(),
        requestDate: new Date(),
        requestDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        approvedByHacker: true,
        approvedByEmployer: false,
        hackerApprovalDate: new Date(),
        employerApprovalDate: null,
        completed: false,
        verified: false
    }

    if (employerResults !== null && hackerResults !== null) {

        const matchhhhingIndex = hackerResults.activeHiredHackingJobs.findIndex((item) => item.generatedID === generatedID);

        const matched = hackerResults.activeHiredHackingJobs[matchhhhingIndex];

        const findMatchingIndexEmployer = employerResults.activeHiredHackers.findIndex((item) => item.generatedID === generatedID);

        const jobMatch = employerResults.activeHiredHackers[findMatchingIndexEmployer];

        const promises = [];

        if (_.has(matched, "requestedJobCompletionReview") && matched.requestedJobCompletionReview.approvedByEmployer === true) {
            // handle employer logic first
            jobMatch.requestedJobCompletionReview.approvedByHacker = true;
            jobMatch.requestedJobCompletionReview.hackerApprovalDate = new Date();
            jobMatch.requestedJobCompletionReview.completed = true;
            // now handle hacker logic changes
            matched.requestedJobCompletionReview.approvedByHacker = true;
            matched.requestedJobCompletionReview.hackerApprovalDate = new Date();
            matched.requestedJobCompletionReview.completed = true;

            // iterate through existing payments & confirm them!

            const interator = matched.paymentHistory;

            for (let index = 0; index < interator.length; index++) {
                const paymentmethod = interator[index];

                if (paymentmethod.completedPayment.object === "payment_intent") {
                    const pendingPaymentIntentCancellation = await stripe.paymentIntents.confirm(paymentmethod.completedPayment.id);

                    promises.push(new Promise((resolve, reject) => resolve(pendingPaymentIntentCancellation)));

                } else if (paymentmethod.completedPayment.object === "subscription_schedule") {

                    const pendingSubscriptionCancellation = await stripe.subscriptionSchedules.del(paymentmethod.completedPayment.id);   

                    promises.push(new Promise((resolve, reject) => resolve(pendingSubscriptionCancellation)))
                }
            }
        } else {

            const newNotification = {
                title: `You've received a NEW request asking to 'mark a current active job as complete'. This means that the hacker you've hired name ${hackerResults.firstName} ${hackerResults.lastName} has marked a job as 'finished/complete'.`,
                description: `${hackerResults.firstName} ${hackerResults.lastName} has said that they've completed a contract you've employed them on HOWEVER we need YOU to verify the authenticity of this request & confirm that all the required/agreed-upon work has indeed actually been completed. Click this notification to view more actions related to this change!`,
                metadata: {
                    attachments: {
                        type: "string",
                        attachment: "The 'redirectID' will take you to the appropriate 'hired-hacking job' by the generatedID.",
                        redirectID: generatedID
                    },
                    from: signedinUserID,
                    other: null
                },
                id: uuidv4(),
                date: new Date(),
                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                seenRead: false
            }
    
            if (_.has(employerResults, "notifications")) {
                employerResults.notifications.push(newNotification);
            } else {
                employerResults["notifications"] = [newNotification];
            }
    
            jobMatch["requestedJobCompletionReview"] = newRequestedJobConfirmation;
            matched["requestedJobCompletionReview"] = newRequestedJobConfirmation;
        }

        console.log("promises", promises);

        if (typeof promises !== "undefined" && promises.length > 0) {
            await Promise.all(promises).then((passedData) => {
                console.log("passedData", passedData);
    
                employerCollection.save(employerResults, (errSaving, savingResult) => {
                    if (errSaving) {
                        console.log("errSaving", errSaving);
        
                        resppppp.json({
                            message: "An error occurred while attempting to save data..",
                            err: errSaving
                        })
                    } else {
                        console.log("savingResult", savingResult);
        
                        hackerCollection.save(hackerResults, (errorrrrrr, savedddd) => {
                            if (errorrrrrr) {
                                console.log("errorrrrrr", errorrrrrr);
                            } else {
                                console.log("savedddd", savedddd);
        
                                resppppp.json({
                                    message: "Successfully marked as complete - request sent!",
                                    data: matched
                                })
                            }
                        })
                    }
                })
            })
        } else {
            employerCollection.save(employerResults, (errSaving, savingResult) => {
                if (errSaving) {
                    console.log("errSaving", errSaving);
    
                    resppppp.json({
                        message: "An error occurred while attempting to save data..",
                        err: errSaving
                    })
                } else {
                    console.log("savingResult", savingResult);
    
                    hackerCollection.save(hackerResults, (errorrrrrr, savedddd) => {
                        if (errorrrrrr) {
                            console.log("errorrrrrr", errorrrrrr);
                        } else {
                            console.log("savedddd", savedddd);
    
                            resppppp.json({
                                message: "Successfully marked as complete - request sent!",
                                data: matched
                            })
                        }
                    })
                }
            })
        }
    }
});

module.exports = router;