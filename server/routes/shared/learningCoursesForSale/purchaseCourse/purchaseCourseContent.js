const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const _ = require("lodash");


router.post("/", async (req, resppppp, next) => {
    
    const { signedInUserID, signedinAccountType, price, id, selectedCard } = req.body;

    const collection = Connection.db.db("db").collection(signedinAccountType);

    console.log("req", req.body);

    const educationalCollection = Connection.db.db("db").collection("learningteachingcourses");
    const hackerCollection = Connection.db.db("db").collection("hackers");
    const employerCollection = Connection.db.db("db").collection("employers");

    const educationalCourse = await educationalCollection.findOne({ id });

    if (educationalCourse !== null) {

        const hackerResults = await hackerCollection.findOne({ uniqueId: educationalCourse.poster });
        const employerResults = await employerCollection.findOne({ uniqueId: educationalCourse.poster });

        if (hackerResults !== null) {
            collection.findOne({ uniqueId: signedInUserID }).then(async (user) => {
                if (!user) {
                    console.log("User does NOT exist or could not be found.");
        
                    resppppp.json({
                        message: "User does NOT exist or could not be found."
                    })
                } else {
                    console.log("user", user);
        
                    if (signedinAccountType === "employers") {
        
                        const customer = await stripe.customers.retrieve(user.stripeAccountDetails.id);
            
                        console.log("customer", customer);
        
                        const currentBal = customer.balance;
        
                        if (currentBal >= price) {
                            await stripe.paymentIntents.create({
                                amount: price,
                                customer: user.stripeAccountDetails.id,
                                currency: 'usd',
                                payment_method: selectedCard.id,
                                description: `You've purchased 'course-content' on ${config.get("applicationName")} and your data/course is NOW available for downloading..`,
                                confirm: true,
                                transfer_data: {
                                    destination: hackerResults.stripeAccountDetails.id,
                                    amount: Number((price * config.get("percentageCut"))).toFixed(0)
                                }
                            }, (err, charge) => {
                                if (err) {
                
                                    console.log("error with payment intent...", err);
                
                                    resppppp.json({
                                        message: "Error with payment logic!",
                                        err
                                    })
                                } else {
        
                                    // changes/data goes here..
    
                                    const safelyModifiedObjCourseData = _.omit(educationalCourse, "purchased", "bookmarks");
    
                                    if (_.has(user, "purchasedCourseData")) {
                                        user.purchasedCourseData.push(safelyModifiedObjCourseData);
                                    } else {
                                        user["purchasedCourseData"] = [safelyModifiedObjCourseData];
                                    }
        
                                    collection.save(user, (errorrrr, result) => {
                                        if (errorrrr) {
                                            console.log("errorrrr saving!", errorrrr);
        
                                            resppppp.json({
                                                message: "Error occurred while saving..",
                                                err: errorrrr
                                            })
                                        } else {
                                            console.log("successfully created and charged 'payment intent'...", charge);
                    
                                            resppppp.json({
                                                message: "Successfully purchased course-content!",
                                                user
                                            })
                                        }
                                    })
                                }
                            });
                        } else {
                            resppppp.json({
                                message: "You do NOT have enough money availiable in your account at this current point in time, please add more funds to your account and then try this action again!"
                            })
                        }
                    } else {
        
                        const balance = await stripe.balance.retrieve({
                            stripeAccount: user.stripeAccountDetails.id
                        });
        
                        for (let idxxxx = 0; idxxxx < balance.available.length; idxxxx++) {
                            const bal = balance.available[idxxxx];
                            if (bal.currency === "usd") {
                                const currentBal = bal.amount;
        
                                if (currentBal >= price) {
                                    if (user.stripeAccountVerified === true) {
                                        const paymentIntention = await await stripe.charges.create({
                                            amount: price,
                                            currency: 'usd',
                                            description: `You've purchased 'course-content' on ${config.get("applicationName")} and your data/course is NOW available for downloading..`,
                                            source: user.stripeAccountDetails.id
                                        });
                        
                                        if (paymentIntention) {
        
                                            // changes/data goes here..

                                            const transfer = await stripe.transfers.create({
                                                amount: Number((price * config.get("percentageCut"))).toFixed(0),
                                                currency: 'usd',
                                                destination: hackerResults.stripeAccountDetails.id
                                            });
                                              
    
                                            if (transfer) {
                                                const safelyModifiedObjCourseData = _.omit(educationalCourse, "purchased", "bookmarks");
    
                                                if (_.has(user, "purchasedCourseData")) {
                                                    user.purchasedCourseData.push(safelyModifiedObjCourseData);
                                                } else {
                                                    user["purchasedCourseData"] = [safelyModifiedObjCourseData];
                                                }
            
                                                collection.save(user, (errorrrr, result) => {
                                                    if (errorrrr) {
                                                        console.log("errorrrr saving!", errorrrr);
                            
                                                        resppppp.json({
                                                            message: "Error occurred while saving..",
                                                            err: errorrrr
                                                        })
                                                    } else {
                                                        console.log("successfully created and charged 'payment intent'...");
                                
                                                        resppppp.json({
                                                            message: "Successfully purchased course-content!",
                                                            user
                                                        })
                                                    }
                                                })
                                            } else {

                                                console.log("paymentIntention", paymentIntention);

                                                await stripe.refunds.create({
                                                    charge: paymentIntention.id,
                                                }, (errorrrrrr, refund) => {
                                                    if (errorrrrrr) {
                                                        resppppp.json({
                                                            message: "Error occurred creating/initalizing transfer to actual account.",
                                                            err: errorrrrrr
                                                        })
                                                    } else {
                                                        console.log("refund", refund);

                                                        resppppp.json({
                                                            message: "Error occurred creating/initalizing transfer to actual account."
                                                        })
                                                    }
                                                });
                                            }
                                        } else {
                        
                                            console.log("error with payment intent...");
                        
                                            resppppp.json({
                                                message: "Error with payment logic!"
                                            })
                                        }
                                    } else {
                                        resppppp.json({
                                            message: "You MUST complete the 'stripe' onboarding process/flow BEFORE making ANY purchases whatsoever. This is non-negotiable however the process is very quick generally speaking!"
                                        })
                                    }
                                } else {
                                    resppppp.json({
                                        message: "You do NOT have enough money availiable in your account at this current point in time, please add more funds to your account and then try this action again!"
                                    })
                                }
                            }
                        }
                    }
                }
            }).catch((err) => {
                console.log(err);
        
                resppppp.json({
                    message: "Unknown error.",
                    err
                })
            })
        } else if (employerResults !== null) {
            collection.findOne({ uniqueId: signedInUserID }).then(async (user) => {
                if (!user) {
                    console.log("User does NOT exist or could not be found.");
        
                    resppppp.json({
                        message: "User does NOT exist or could not be found."
                    })
                } else {
                    console.log("user", user);
        
                    if (signedinAccountType === "employers") {
        
                        const customer = await stripe.customers.retrieve(user.stripeAccountDetails.id);
            
                        console.log("customer", customer);
        
                        const currentBal = customer.balance;
        
                        if (currentBal >= price) {
                            await stripe.paymentIntents.create({
                                amount: price,
                                customer: user.stripeAccountDetails.id,
                                currency: 'usd',
                                payment_method: selectedCard.id,
                                description: `You've purchased 'course-content' on ${config.get("applicationName")} and your data/course is NOW available for downloading..`,
                                confirm: true,
                                transfer_data: {
                                    destination: employerResults.stripeAccountDetails.id,
                                    amount: Number((price * config.get("percentageCut"))).toFixed(0)
                                }
                            }, (err, charge) => {
                                if (err) {
                
                                    console.log("error with payment intent...", err);
                
                                    resppppp.json({
                                        message: "Error with payment logic!",
                                        err
                                    })
                                } else {
        
                                    // changes/data goes here..
                                    const safelyModifiedObjCourseData = _.omit(educationalCourse, "purchased", "bookmarks");
    
                                    if (_.has(user, "purchasedCourseData")) {
                                        user.purchasedCourseData.push(safelyModifiedObjCourseData);
                                    } else {
                                        user["purchasedCourseData"] = [safelyModifiedObjCourseData];
                                    }
        
                                    collection.save(user, (errorrrr, result) => {
                                        if (errorrrr) {
                                            console.log("errorrrr saving!", errorrrr);
        
                                            resppppp.json({
                                                message: "Error occurred while saving..",
                                                err: errorrrr
                                            })
                                        } else {
                                            console.log("successfully created and charged 'payment intent'...", charge);
                    
                                            resppppp.json({
                                                message: "Successfully purchased course-content!",
                                                user
                                            })
                                        }
                                    })
                                }
                            });
                        } else {
                            resppppp.json({
                                message: "You do NOT have enough money availiable in your account at this current point in time, please add more funds to your account and then try this action again!"
                            })
                        }
                    } else {
        
                        const balance = await stripe.balance.retrieve({
                            stripeAccount: user.stripeAccountDetails.id
                        });
        
                        for (let idxxxx = 0; idxxxx < balance.available.length; idxxxx++) {
                            const bal = balance.available[idxxxx];
                            if (bal.currency === "usd") {
                                const currentBal = bal.amount;
        
                                if (currentBal >= price) {
                                    if (user.stripeAccountVerified === true) {
                                        const paymentIntention = await await stripe.charges.create({
                                            amount: price,
                                            currency: 'usd',
                                            description: `You've purchased 'course-content' on ${config.get("applicationName")} and your data/course is NOW available for downloading..`,
                                            source: user.stripeAccountDetails.id
                                        });
                        
                                        if (paymentIntention) {
        
                                            // changes/data goes here..

                                            const transfer = await stripe.transfers.create({
                                                amount: Number((price * config.get("percentageCut"))).toFixed(0),
                                                currency: 'usd',
                                                destination: employerResults.stripeAccountDetails.id
                                            });
                                              
    
                                            if (transfer) {
                                                const safelyModifiedObjCourseData = _.omit(educationalCourse, "purchased", "bookmarks");
    
                                                if (_.has(user, "purchasedCourseData")) {
                                                    user.purchasedCourseData.push(safelyModifiedObjCourseData);
                                                } else {
                                                    user["purchasedCourseData"] = [safelyModifiedObjCourseData];
                                                }
            
                                                collection.save(user, (errorrrr, result) => {
                                                    if (errorrrr) {
                                                        console.log("errorrrr saving!", errorrrr);
                            
                                                        resppppp.json({
                                                            message: "Error occurred while saving..",
                                                            err: errorrrr
                                                        })
                                                    } else {
                                                        console.log("successfully created and charged 'payment intent'...");
                                
                                                        resppppp.json({
                                                            message: "Successfully purchased course-content!",
                                                            user
                                                        })
                                                    }
                                                })
                                            } else {

                                                console.log("paymentIntention", paymentIntention);

                                                await stripe.refunds.create({
                                                    charge: paymentIntention.id,
                                                }, (errorrrrrr, refund) => {
                                                    if (errorrrrrr) {
                                                        resppppp.json({
                                                            message: "Error occurred creating/initalizing transfer to actual account.",
                                                            err: errorrrrrr
                                                        })
                                                    } else {
                                                        console.log("refund", refund);

                                                        resppppp.json({
                                                            message: "Error occurred creating/initalizing transfer to actual account."
                                                        })
                                                    }
                                                });
                                            }
                                        } else {
                        
                                            console.log("error with payment intent...");
                        
                                            resppppp.json({
                                                message: "Error with payment logic!"
                                            })
                                        }
                                    } else {
                                        resppppp.json({
                                            message: "You MUST complete the 'stripe' onboarding process/flow BEFORE making ANY purchases whatsoever. This is non-negotiable however the process is very quick generally speaking!"
                                        })
                                    }
                                } else {
                                    resppppp.json({
                                        message: "You do NOT have enough money availiable in your account at this current point in time, please add more funds to your account and then try this action again!"
                                    })
                                }
                            }
                        }
                    }
                }
            }).catch((err) => {
                console.log(err);
        
                resppppp.json({
                    message: "Unknown error.",
                    err
                })
            })
        } else {
            resppppp.json({
                message: "Could NOT find EITHER account type..."
            })
        }
    } else {
        resppppp.json({
            message: "Could NOT retreieve the requested course-information, please try this action again or contract support if the problem persists!"
        })
    }
});

module.exports = router;