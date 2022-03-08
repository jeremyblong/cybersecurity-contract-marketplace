const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../mongoUtil.js");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const _ = require("lodash");

router.post("/", async (req, resppppp, next) => {
    
    const { userID, paydayEachAmount, activeCard, hackerID, publicCompanyName, jobID, daysToPay, selectedDayOfWeek } = req.body; // userID is signed in user (employer)

    console.log("req.body recieved..: ", req.body);

    const employerCollection = Connection.db.db("db").collection("employers");
    const hackerCollection = Connection.db.db("db").collection("hackers");

    const employer = await employerCollection.findOne({ uniqueId: userID });
    const hacker = await hackerCollection.findOne({ uniqueId: hackerID });

    const lastPaymentDay = daysToPay[daysToPay.length - 1];
    const firstPaymentDay = daysToPay[0];

    if (employer !== null && hacker !== null) {

        const productID = uuidv4();
        const generatedID = uuidv4();

        const product = await stripe.products.create({
            name: `Recurring Contract Payment for ${hacker.firstName} ${hacker.lastName}`,
            description: "This is a recurring payment to a hacker contracted user - this will be continuous until fully paid or cancelled and will be billed consistently.",
            id: productID
        });

        console.log("product", product);

        if (product) {
            const price = await stripe.prices.create({
                unit_amount: Math.round(paydayEachAmount * 100),
                currency: 'usd',
                recurring: { 
                    interval: 'day',
                    usage_type: "licensed",
                    interval_count: 7
                },
                product: product.id
                // tax_behavior: "inclusive"
            });
    
            console.log("price", price);

            if (price) {
                await stripe.subscriptionSchedules.create({
                    customer: employer.stripeAccountDetails.id,
                    start_date: Math.round(new Date(firstPaymentDay).getTime() / 1000),
                    end_behavior: 'release',
                    phases: [
                      {
                        items: [{ price: price.id }],
                        default_payment_method: activeCard.id,
                        end_date: Math.round(new Date(lastPaymentDay).getTime() / 1000),
                        // automatic_tax: {
                        //     enabled: true
                        // }
                      }
                    ],
                }, (error, result) => {
                    if (error) {
                        console.log("error stripe.subscriptions.create : ", error);
                    } else {
                        console.log("result", result);

                        const newPaymentCompleted = {
                            id: generatedID,
                            date: new Date(),
                            formattedDate: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                            completedPayment: {
                                ...result,
                                firstPaymentDay,
                                lastPaymentDay,
                                paymentDayOfWeek: selectedDayOfWeek
                            },
                            recurring: true,
                            paidBy: userID,
                            full: true,
                            partial: false,
                            pending: true,
                            paidByFullName: `${employer.firstName} ${employer.lastName}`
                        };
        
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
        
                                            const cancelAttempt = await stripe.subscriptions.del(result.id);
        
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
        
                                                const cancelAttempt = await stripe.subscriptions.del(result.id);
        
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
                    }
                });
            }
        } 
    } else {
        console.log("Err gathering finding users");

        resppppp.json({
            message: "An error occurred while attempting to gather/find users.."
        })
    }
});

module.exports = router;