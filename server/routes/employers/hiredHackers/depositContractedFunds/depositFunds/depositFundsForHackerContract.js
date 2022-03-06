const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const _ = require("lodash");

router.post("/", async (req, resppppp, next) => {
    
    const { userID, depositAmount, activeCard, hackerID, publicCompanyName, jobID } = req.body; // userID is signed in user (employer)

    const employerCollection = Connection.db.db("db").collection("employers");
    const hackerCollection = Connection.db.db("db").collection("hackers");

    const employer = await employerCollection.findOne({ uniqueId: userID });
    const hacker = await hackerCollection.findOne({ uniqueId: hackerID });

    if (employer !== null && hacker !== null) {

        await stripe.paymentIntents.create({
            amount: Math.round(depositAmount) * 100,
            payment_method_types: ['card'],
            confirm: false,
            currency: "usd",
            customer: employer.stripeAccountDetails.id,
            description: "Payment made in relation to a 'contracted hacker' - deposit funds to provide 'purchase-proof' for the hacker so they can get started with the desired contract.",
            payment_method: activeCard.id
        }, (err, result) => {
            if (err) {
                console.log("critical error creating intent..:", err);

                return resppppp.json({
                    message: "An error occurred while attempting to make deposit/payment for contracted worker",
                    err
                }) 
            } else {
                const generatedID = uuidv4();

                const newPaymentCompleted = {
                    id: generatedID,
                    date: new Date(),
                    formattedDate: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                    completedPayment: result,
                    paidBy: userID,
                    full: true,
                    recurring: false,
                    partial: false,
                    pending: true,
                    paidByFullName: `${employer.firstName} ${employer.lastName}`
                } // paymentHistory

                const customPromise = new Promise((resolve, reject) => {
                    for (let index = 0; index < hacker.activeHiredHackingJobs.length; index++) {
                        const job = hacker.activeHiredHackingJobs[index];
                        if (job.id === jobID) {
                            if (_.has(job, "paymentHistory")) {
                                job.paymentHistory.push(newPaymentCompleted);
                            } else {
                                job["paymentHistory"] = [newPaymentCompleted];
                            }

                            hackerCollection.save(hacker, async (error, saved) => {
                                if (error) {
                                    console.log("error saving first chunk - :", error);

                                    const cancelAttempt = await stripe.paymentIntents.cancel(result.id);

                                    if (cancelAttempt) {
                                        resolve(null); 
                                    }
                                } else {
                                    resolve(saved);
                                }
                            })
                        }
                    }
                })

                customPromise.then((passed) => {
                    console.log("passed", passed);

                    if (passed === null) {
                        // remove previously saved database data AND cancel pending payment..
                        return resppppp.json({
                            message: "An error occurred while attempting to make deposit/payment for contracted worker",
                            err: error
                        })  
                    } else {
                        // success, save remaining data..

                        for (let index = 0; index < employer.activeHiredHackers.length; index++) {
                            const job = employer.activeHiredHackers[index];
                            if (job.id === jobID) {
                                if (_.has(job, "paymentHistory")) {
                                    job.paymentHistory.push(newPaymentCompleted);
                                } else {
                                    job["paymentHistory"] = [newPaymentCompleted];
                                }
        
                                employerCollection.save(employer, async (error, saved) => {
                                    if (error) {
                                        console.log("error saving first chunk - :", error);

                                        const cancelAttempt = await stripe.paymentIntents.cancel(result.id);

                                        if (cancelAttempt) {

                                            const findModifiedIndex = hacker.activeHiredHackingJobs.findIndex(x => x.id === generatedID);
                                            
                                            hacker.activeHiredHackingJobs.splice(findModifiedIndex, 1);

                                            hackerCollection.save(hacker, (error, saved) => {
                                                if (error) {
                                                    console.log("error saving inner inner - :", error);

                                                    return resppppp.json({
                                                        message: "An error occurred while attempting to make deposit/payment for contracted worker",
                                                        err: error
                                                    }) 
                                                } else {
        
                                                    return resppppp.json({
                                                        message: "Successfully saved some data however we had to abandon tasks - changes we undone."
                                                    })
                                                }
                                            })  
                                        }
                                    } else {

                                        return resppppp.json({
                                            message: "Successfully deposited funds and notified hacker!",
                                            employer
                                        })
                                    }
                                })
                            }
                        }
                    }
                })
            }
        });
    } else {
        console.log("Err gathering finding users");

        return resppppp.json({
            message: "An error occurred while attempting to gather/find users.."
        })
    }
});

module.exports = router;