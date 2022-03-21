const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const _ = require("lodash");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const { signedinAccountType, signedinID, tier } = req.body;

    const collection = Connection.db.db("db").collection(signedinAccountType);

    const handleTierOne = (user) => {
        console.log("handleTierOne ran/running..");

        user["premierAccountStatus"] = true;
        user["subscriptionTier"] = tier;
        user.tokens += 25;
        user["experienceMultiplier"] = true;
        user["subscriptionData"] = {
            id: uuidv4(),
            activatedRecurringDate: new Date(),
            dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
            recurring: true
        }

        if (_.has(user, "profileBoostsRemaining")) {
            user.profileBoostsRemaining += 1;
        } else {
            user["profileBoostsRemaining"] = 1;
        }
        if (_.has(user, "specialEventTickets")) {
            user.specialEventTickets += 1;
        } else {
            user["specialEventTickets"] = 1;
        }

        collection.save(user, (err, result) => {
            if (err) {
                console.log("err saving..", err);
            } else {
                console.log("Result saving", result);

                resppppp.json({
                    message: "Subscribed successfully!",
                    user
                })
            }
        })
    }
    const handleTierTwo = (user) => {
        console.log("handleTierTwo ran/running..");

        user["premierAccountStatus"] = true;
        user["subscriptionTier"] = tier;
        user.tokens += 40;
        user["experienceMultiplier"] = true;
        user["subscriptionData"] = {
            id: uuidv4(),
            activatedRecurringDate: new Date(),
            dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
            recurring: true
        }

        if (_.has(user, "profileBoostsRemaining")) {
            user.profileBoostsRemaining += 3;
        } else {
            user["profileBoostsRemaining"] = 3;
        }
        if (_.has(user, "specialEventTickets")) {
            user.specialEventTickets += 2;
        } else {
            user["specialEventTickets"] = 2;
        }

        collection.save(user, (err, result) => {
            if (err) {
                console.log("err saving..", err);
            } else {
                console.log("Result saving", result);

                resppppp.json({
                    message: "Subscribed successfully!",
                    user
                })
            }
        })
    }
    const handleTierThree = (user) => {
        console.log("handleTierThree ran/running..");

        user["premierAccountStatus"] = true;
        user["subscriptionTier"] = tier;
        user.tokens += 60;
        user["experienceMultiplier"] = true;
        user["subscriptionData"] = {
            id: uuidv4(),
            activatedRecurringDate: new Date(),
            dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
            recurring: true
        }

        if (_.has(user, "profileBoostsRemaining")) {
            user.profileBoostsRemaining += 5;
        } else {
            user["profileBoostsRemaining"] = 5;
        }
        if (_.has(user, "specialEventTickets")) {
            user.specialEventTickets += 3;
        } else {
            user["specialEventTickets"] = 3;
        }

        collection.save(user, (err, result) => {
            if (err) {
                console.log("err saving..", err);
            } else {
                console.log("Result saving", result);

                resppppp.json({
                    message: "Subscribed successfully!",
                    user
                })
            }
        })
    }

    const calculateCost = () => {
        switch (tier) {
            case "tier-1":
                return 2500;
                break;
            case "tier-2":
                return 3500;
                break;
            case "tier-3":
                return 4500;
                break;
            default:
                break;
        }
    }

    collection.findOne({ uniqueId: signedinID }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            if (user.accountType === "hackers") {
                if (user.stripeAccountVerified === true) {
                    await stripe.charges.create({
                        amount: calculateCost(),
                        currency: 'usd',
                        source: user.stripeAccountDetails.id,
                        description: `'Subscribing' to membership on ${config.get("applicationName")} - this will enhance your account privileges & overall general activity throughout our platform!`,
                    }, (error, result) => {
                        if (error) {
                            console.log("error stripe..:", error);
                        } else {
                            console.log("result", result);
        
                            // run switch statement for account changes
                            switch (tier) {
                                case "tier-1":
                                    handleTierOne(user);
                                    break;
                                case "tier-2":
                                    handleTierTwo(user);
                                    break;
                                case "tier-3":
                                    handleTierThree(user);
                                    break;
                                default:
                                    resppppp.json({
                                        message: "Unknown error."
                                    })
                                    break;
                            }
                        }
                    });
                } else {
                    resppppp.json({
                        message: "Have NOT completed onboarding flow.."
                    })
                }
            } else {

                const customer = await stripe.customers.retrieve(user.stripeAccountDetails.id);
                  
                console.log("customer", customer);

                if (customer.invoice_settings.default_payment_method !== null) {

                    console.log("payment default exists!");
                    
                    // payment default exists!

                    await stripe.paymentIntents.create({
                        amount: calculateCost(),
                        customer: user.stripeAccountDetails.id,
                        currency: 'usd',
                        payment_method: customer.invoice_settings.default_payment_method.id,
                        description: `'Subscribing' to membership on ${config.get("applicationName")} - this will enhance your account privileges & overall general activity throughout our platform!`,
                        confirm: true
                    }, async (err, charge) => {
                        if (err) {
                            resppppp.json({
                                message: "Error with payment logic!",
                                err
                            })
                        } else {
                            console.log("charge", charge);
    
                            // run switch statement for account changes
                            switch (tier) {
                                case "tier-1":
                                    handleTierOne(user);
                                    break;
                                case "tier-2":
                                    handleTierTwo(user);
                                    break;
                                case "tier-3":
                                    handleTierThree(user);
                                    break;
                                default:
                                    resppppp.json({
                                        message: "Unknown error."
                                    })
                                    break;
                            }
                        }
                    });
                } else {
                    // default payment method does NOT exist!

                    console.log("Default payment method does NOT exist!");

                    const paymentMethods = await stripe.paymentMethods.list({
                        customer: user.stripeAccountDetails.id,
                        type: 'card'
                    });
                    
                    console.log("paymentMethods", paymentMethods);

                    await stripe.paymentIntents.create({
                        amount: calculateCost(),
                        customer: user.stripeAccountDetails.id,
                        currency: 'usd',
                        payment_method: paymentMethods.data[0].id,
                        description: `'Subscribing' to membership on ${config.get("applicationName")} - this will enhance your account privileges & overall general activity throughout our platform!`,
                        confirm: true
                    }, async (err, charge) => {
                        if (err) {
                            resppppp.json({
                                message: "Error with payment logic!",
                                err
                            })
                        } else {
                            console.log("charge", charge);
    
                            // run switch statement for account changes
                            switch (tier) {
                                case "tier-1":
                                    handleTierOne(user);
                                    break;
                                case "tier-2":
                                    handleTierTwo(user);
                                    break;
                                case "tier-3":
                                    handleTierThree(user);
                                    break;
                                default:
                                    resppppp.json({
                                        message: "Unknown error."
                                    })
                                    break;
                            }
                        }
                    });
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
});

module.exports = router;