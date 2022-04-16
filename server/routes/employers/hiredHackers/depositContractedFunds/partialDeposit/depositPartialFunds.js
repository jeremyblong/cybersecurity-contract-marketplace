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

    console.log("Req.body", req.body);

    const employerCollection = Connection.db.db("db").collection("employers");
    const hackerCollection = Connection.db.db("db").collection("hackers");

    const employer = await employerCollection.findOne({ uniqueId: userID });
    const hacker = await hackerCollection.findOne({ uniqueId: hackerID });

    if (employer !== null && hacker !== null) {

        const calculateDate = () => {
            // date referred/signed-up
            const referralDate = new Date(hacker.referral.date);
            const hours = 730; // approx. ONE MONTH in hours..
            // exp date - discontinue perks..
            const expirationDate = referralDate.setHours(referralDate.getHours() + hours);

            if (referralDate < expirationDate) {
                return true;
            } else {    
                return false;
            }
        }

        await stripe.paymentIntents.create({
            amount: Math.round(depositAmount) * 100,
            payment_method_types: ['card'],
            confirm: false,
            currency: "usd",
            customer: employer.stripeAccountDetails.id,
            description: "Payment made in relation to a 'contracted hacker' - deposit funds to provide 'purchase-proof' for the hacker so they can get started with the desired contract.",
            payment_method: activeCard.id,
            transfer_data: {
                destination: hacker.stripeAccountDetails.id,
                amount: _.has(hacker, "referral") && calculateDate() ? Number(Math.round(depositAmount) * 100).toFixed(0) : Number(((Math.round(depositAmount) * 100) * config.get("percentageCut"))).toFixed(0)
            }
        }, (err, result) => {
            if (err) {
                console.log("critical error creating intent..:", err);

                resppppp.json({
                    message: "An error occurred while attempting to make deposit/payment for contracted worker",
                    err
                }) 
            } else {

                console.log("result", result);
                
                if (typeof hacker.activeHiredHackingJobs !== "undefined" && hacker.activeHiredHackingJobs.length > 0) {
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
                            if (job.generatedID === jobID) {
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
                                if (job.generatedID === jobID) {
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

                                                        resppppp.json({
                                                            message: "An error occurred while attempting to make deposit/payment for contracted worker",
                                                            err: error
                                                        }) 
                                                    } else {
            
                                                        resppppp.status(200).json({
                                                            message: "Successfully saved some data however we had to abandon tasks - changes we undone."
                                                        })
                                                    }
                                                })  
                                            }
                                        } else {

                                            resppppp.status(200).json({
                                                message: "Successfully deposited funds and notified hacker!",
                                                employer
                                            })
                                        }
                                    })
                                }
                            }
                        }
                    }).catch((err) => {
                        console.log(err);
                        return res.status(404).json({ message: err.message }) 
                    })
                } else {
                    resppppp.status(200).json({
                        message: "Listing/job is already complete, cannot make payment!",
                        employer
                    })
                }
            }
        });
    } else {
        console.log("Err gathering finding users");

        resppppp.json({
            message: "An error occurred while attempting to gather/find users.."
        })
    }
});

module.exports = router;