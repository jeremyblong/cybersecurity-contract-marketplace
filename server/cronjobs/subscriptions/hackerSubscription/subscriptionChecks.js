const cron = require("node-cron");
const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const _ = require("lodash");

const runCronJob = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('running a task every 20 sec');

        const employerCollection = Connection.db.db("db").collection("employers");
        const hackersCollection = Connection.db.db("db").collection("hackers");

        const handleTierOne = (user, accountType, tier) => {
            console.log("handleTierOne ran/running..");
    
            user["premierAccountStatus"] = true;
            user.tokens += 25;
            user["experienceMultiplier"] = true;
            user["subscriptionTier"] = tier;
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
    
            if (accountType === "employers") {
                employerCollection.save(user, (err, result) => {
                    if (err) {
                        console.log("err saving..", err);
                    } else {
                        console.log("Successfully updated! CRONJON...:", result);
                    }
                })
            } else {
                hackersCollection.save(user, (err, result) => {
                    if (err) {
                        console.log("err saving..", err);
                    } else {
                        console.log("Result saving", result);
        
                        console.log("Successfully updated! CRONJON...:", result);
                    }
                })
            }
        }
        const handleTierTwo = (user, accountType, tier) => {
            console.log("handleTierTwo ran/running..");
    
            user["premierAccountStatus"] = true;
            user.tokens += 40;
            user["experienceMultiplier"] = true;
            user["subscriptionTier"] = tier;
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
    
            if (accountType === "employers") {
                employerCollection.save(user, (err, result) => {
                    if (err) {
                        console.log("err saving..", err);
                    } else {
                        console.log("Result saving", result);
        
                        console.log("Successfully updated! CRONJON...:", result);
                    }
                })
            } else {
                hackersCollection.save(user, (err, result) => {
                    if (err) {
                        console.log("err saving..", err);
                    } else {
                        console.log("Result saving", result);
        
                        console.log("Successfully updated! CRONJON...:", result);
                    }
                })
            }
        }
        const handleTierThree = (user, accountType, tier) => {
            console.log("handleTierThree ran/running..");
    
            user["premierAccountStatus"] = true;
            user.tokens += 60;
            user["experienceMultiplier"] = true;
            user["subscriptionTier"] = tier;
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
    
            if (accountType === "employers") {
                employerCollection.save(user, (err, result) => {
                    if (err) {
                        console.log("err saving..", err);
                    } else {
                        console.log("Result saving", result);
        
                        console.log("Successfully updated! CRONJON...:", result);
                    }
                })
            } else {
                hackersCollection.save(user, (err, result) => {
                    if (err) {
                        console.log("err saving..", err);
                    } else {
                        console.log("Result saving", result);
        
                        console.log("Successfully updated! CRONJON...:", result);
                    }
                })
            }
        }

        const firstResults = await employerCollection.find({ premierAccountStatus: true }).toArray();

        const secondResults = await hackersCollection.find({ premierAccountStatus: true }).toArray();

        const combined = [...secondResults, ...firstResults];

        const calculateCost = (tier) => {
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

        for (let index = 0; index < combined.length; index++) {
            const user = combined[index];

            if (user.accountType === "hackers") {
                console.log("hackers!");
                if (new Date(user.subscriptionData.activatedRecurringDate) > new Date()) {
                    await stripe.charges.create({
                        amount: calculateCost(user.subscriptionTier),
                        currency: 'usd',
                        source: user.stripeAccountDetails.id,
                        description: `'Subscribing' to membership on ${config.get("applicationName")} - this will enhance your account privileges & overall general activity throughout our platform!`,
                    }, (error, result) => {
                        if (error) {
                            console.log("error stripe..:", error);
        
                            resppppp.json({
                                message: "Unknown error.",
                                err: error
                            })
                        } else {
                            console.log("result", result);
        
                            // run switch statement for account changes
                            switch (user.subscriptionTier) {
                                case "tier-1":
                                    handleTierOne(user, user.accountType, user.subscriptionTier);
                                    break;
                                case "tier-2":
                                    handleTierTwo(user, user.accountType, user.subscriptionTier);
                                    break;
                                case "tier-3":
                                    handleTierThree(user, user.accountType, user.subscriptionTier);
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                } else {
                    console.log("do nothing - not after date!");
                }
            } else {
                console.log("OTHER! (employers)");

                const customer = await stripe.customers.retrieve(user.stripeAccountDetails.id);
                  
                console.log("customer", customer);

                if (new Date(user.subscriptionData.activatedRecurringDate) > new Date()) {
                    if (customer.invoice_settings.default_payment_method !== null) {

                        console.log("payment default exists!");
                        
                        // payment default exists!
    
                        await stripe.paymentIntents.create({
                            amount: calculateCost(user.subscriptionTier),
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
                                switch (user.subscriptionTier) {
                                    case "tier-1":
                                        handleTierOne(user, user.accountType, user.subscriptionTier);
                                        break;
                                    case "tier-2":
                                        handleTierTwo(user, user.accountType, user.subscriptionTier);
                                        break;
                                    case "tier-3":
                                        handleTierThree(user, user.accountType, user.subscriptionTier);
                                        break;
                                    default:
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
                            amount: calculateCost(user.subscriptionTier),
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
                                switch (user.subscriptionTier) {
                                    case "tier-1":
                                        handleTierOne(user, user.accountType, user.subscriptionTier);
                                        break;
                                    case "tier-2":
                                        handleTierTwo(user, user.accountType, user.subscriptionTier);
                                        break;
                                    case "tier-3":
                                        handleTierThree(user, user.accountType, user.subscriptionTier);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        });
                    }
                } else {
                    console.log('date not reached yet... do nothing!');
                }
            }
        }
    });
}

module.exports = runCronJob;