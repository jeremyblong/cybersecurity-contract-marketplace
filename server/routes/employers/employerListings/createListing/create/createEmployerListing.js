const express = require("express");
const router = express.Router();
const Listing = require("../../../../../schemas/listings/employer/createNewListing.js");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const { Connection } = require("../../../../../mongoUtil.js");

router.post("/", (req, resppppp, next) => {
    
    const { uniqueId, data, alreadyExistentCard, existentCard, cost, name, number, focus, expiry, cvc } = req.body;

    const newListing = new Listing({
        ...data,
        postedBy: uniqueId,
        postedDate: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        systemDate: Date.now(),
        applicants: [],
        uniqueId: uuidv4(),
        comments: [],
        likedBy: [],
        likes: 0,
        dislikedBy: [],
        dislikes: 0,
        totalViews: 0,
        viewedBy: [],
        applicantIDArray: []
    });
    
    console.log("REQ.BODY :", req.body);

    const collection = Connection.db.db("db").collection("employers");

    collection.findOne({ uniqueId }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            if (alreadyExistentCard === true) {
                console.log("using pre-existing card data");
                // using pre-existing card data
        
                await stripe.paymentIntents.create({
                    amount: cost,
                    customer: user.stripeAccountDetails.id,
                    currency: 'usd',
                    payment_method: existentCard.value.id,
                    description: `Payment directly to ${config.get("applicationName")} for 'posting a new listing' fee..`,
                    confirm: true
                }, (err, charge) => {
                    if (err) {
                        resppppp.json({
                            message: "Error with payment logic!",
                            err
                        })
                    } else {
                        console.log("charge", charge);

                        newListing.save((err, result) => {
                            if (err) {
                                console.log(err);
                    
                                resppppp.json({
                                    message: "Error saving new listing data...",
                                    err
                                });
                            } else {
                                resppppp.json({
                                    message: "Successfully posted a new employer listing!",
                                    data: result
                                });
                            }
                        })
                    }
                });
            } else {
                console.log("using typed custom card info");
                // using typed custom card info
                await stripe.paymentMethods.create({
                    type: 'card',
                    card: {
                      number,
                      exp_month: expiry.substring(0, 2),
                      exp_year: expiry.substring(3, 5),
                      cvc,
                    },
                }, async (errrrrrrr, successData) => {
                    if (errrrrrrr) {
                        console.log(errrrrrrr);
    
                        resppppp.json({
                            message: "An error has occurred while attempting to create the desired card data...",
                            err: errrrrrrr
                        })
                    } else {
                        console.log("successData", successData);
    
                        const paymentMethod = await stripe.paymentMethods.attach(successData.id, { customer: user.stripeAccountDetails.id });
    
                        if (paymentMethod) {

                            await stripe.paymentIntents.create({
                                amount: cost,
                                customer: user.stripeAccountDetails.id,
                                currency: 'usd',
                                payment_method: successData.id,
                                description: `Payment directly to ${config.get("applicationName")} for 'posting a new listing' fee..`,
                                confirm: true
                            }, (err, charge) => {
                                if (err) {
                                    resppppp.json({
                                        message: "Error with payment logic!",
                                        err
                                    })
                                } else {
                                    console.log("charge", charge);
            
                                    newListing.save((err, result) => {
                                        if (err) {
                                            console.log(err);
                                
                                            resppppp.json({
                                                message: "Error saving new listing data...",
                                                err
                                            });
                                        } else {
                                            resppppp.json({
                                                message: "Successfully posted a new employer listing!",
                                                data: result.value
                                            });
                                        }
                                    })
                                }
                            });
                        } else {
                            resppppp.json({
                                message: "An error has occurred while attempting to create the desired card data..."
                            })
                        }
                    }
                });
            }
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err
        })
    })
});

module.exports = router;