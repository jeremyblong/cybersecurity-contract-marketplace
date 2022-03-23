const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const createNewBoostedListingSchema = require("../../../../schemas/boostedData/employerListings/boostEmployerListingSchema.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment")
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));

router.post("/", async (req, resppppp, next) => {
    
    const { listingID, fullListing, card, manuallyEntered, cardPaymentSelected, employerId, listingTierSelected } = req.body;

    const employerListingsCollection = Connection.db.db("db").collection("employerlistings");
    const employerCollection = Connection.db.db("db").collection("employers");
    const alreadyBoostedCollection = Connection.db.db("db").collection("boostedemployerlistings");
    const secondsInDay = 86400;
    
    const foundPreviouslyPostedListing = await employerListingsCollection.findOne({ uniqueId: listingID });
    const foundEmployerAccount = await employerCollection.findOne({ uniqueId: employerId });
    const alreadyBoostedOrNot = await alreadyBoostedCollection.findOne({ uniqueId: listingID });

    console.log("-----------------------------------------------------------", alreadyBoostedOrNot);

    const calculateTierSecondsTTL = () => {
        switch (listingTierSelected) {
            case "tier-1":
                return secondsInDay * 1;
                break;
            case "tier-2":
                return secondsInDay * 2;
                break;
            case "tier-3":
                return secondsInDay * 3;
                break;
            default:
                break;
        }
    }
    const calculateCost = () => {
        switch (listingTierSelected) {
            case "tier-1":
                return 1000;
                break;
            case "tier-2":
                return 3000;
                break;
            case "tier-3":
                return 5000;
                break;
            default:
                break;
        }
    }
    const generatedID = uuidv4();

    const newListingData = createNewBoostedListingSchema(calculateTierSecondsTTL(), {
        ...foundPreviouslyPostedListing,
        createdAt: new Date(), 
        id: generatedID, 
        date: new Date(), 
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a")
    });
    
    if (alreadyBoostedOrNot === null) {
        if (manuallyEntered === false) {
            console.log("using pre-existing card data");
            // using pre-existing card data
    
            await stripe.paymentIntents.create({
                amount: calculateCost(),
                customer: foundEmployerAccount.stripeAccountDetails.id,
                currency: 'usd',
                payment_method: cardPaymentSelected.value.id,
                description: `Payment directly to ${config.get("applicationName")} for 'boosting employer listing' fee..`,
                confirm: true
            }, (err, charge) => {
                if (err) {
                    resppppp.json({
                        message: "Error with payment logic!",
                        err
                    })
                } else {
    
                    newListingData.save((err, result) => {
                        if (err) {
                            resppppp.json({
                                message: "An error occurred while attempting to save new data..",
                                err
                            })
                        } else {
                            resppppp.json({
                                message: "Successfully boosted your selected listing!",
                                listing: foundPreviouslyPostedListing,
                                cost: calculateCost()
                            })
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
                  number: card.number,
                  exp_month: card.expiry.substring(0, 2),
                  exp_year: card.expiry.substring(3, 5),
                  cvc: card.cvc,
                },
                billing_details: {
                    name: card.name
                }
            }, async (errrrrrrr, successData) => {
                if (errrrrrrr) {
                    resppppp.json({
                        message: "An error has occurred while attempting to create the desired card data...",
                        err: errrrrrrr
                    })
                } else {
                    const paymentMethod = await stripe.paymentMethods.attach(successData.id, { customer: foundEmployerAccount.stripeAccountDetails.id });
    
                    if (paymentMethod) {
    
                        await stripe.paymentIntents.create({
                            amount: calculateCost(),
                            customer: foundEmployerAccount.stripeAccountDetails.id,
                            currency: 'usd',
                            payment_method: successData.id,
                            description: `Payment directly to ${config.get("applicationName")} for 'boosting employer listing' fee..`,
                            confirm: true
                        }, (err, charge) => {
                            if (err) {
                                resppppp.json({
                                    message: "Error with payment logic!",
                                    err
                                })
                            } else {
                                newListingData.save((err, result) => {
                                    if (err) {
                                        console.log("Saving err", err);
                            
                                        resppppp.json({
                                            message: "An error occurred while attempting to save new data..",
                                            err
                                        })
                                    } else {
                                        console.log("result", result);
                            
                                        resppppp.json({
                                            message: "Successfully boosted your selected listing!",
                                            listing: foundPreviouslyPostedListing,
                                            cost: calculateCost()
                                        })
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
    } else {
        resppppp.json({
            message: "Already boosted this listing!"
        })
    }
});

module.exports = router;