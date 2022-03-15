const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));


router.post("/", (req, resppppp, next) => {
    
    const { signedinUserID, signedinAccountType, tokens } = req.body;

    const collection = Connection.db.db("db").collection(signedinAccountType);

    const calculateCost = () => {
        switch (tokens) {
            case 25:
                return 1499;
                break;
            case 50:
                return 2499;
                break;
            case 100:
                return 3999;
                break;
            case 175:
                return 6999;
                break;
            default:
                break;
        }
    }

    collection.findOne({ uniqueId: signedinUserID }).then(async (user) => {
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

                if (currentBal >= calculateCost()) {
                    if (customer !== null && customer.default_source !== null) {
                        console.log("payment method NOT null!");
        
                        await stripe.paymentIntents.create({
                            amount: calculateCost(),
                            customer: user.stripeAccountDetails.id,
                            currency: 'usd',
                            payment_method: customer.default_source,
                            description: `Purchased ${tokens} token's to be used on ${config.get("applicationName")} for various activities..`,
                            confirm: true
                        }, (err, charge) => {
                            if (err) {
            
                                console.log("error with payment intent...", err);
            
                                resppppp.json({
                                    message: "Error with payment logic!",
                                    err
                                })
                            } else {
    
                                user.tokens += tokens;
    
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
                                            message: "Purchased tokens successfully!",
                                            user
                                        })
                                    }
                                })
                            }
                        });
                    } else {
    
                        const paymentMethods = await stripe.paymentMethods.list({
                            customer: user.stripeAccountDetails.id,
                            type: 'card'
                        });
    
                        const cards = paymentMethods.data;
    
                        if (typeof cards !== "undefined" && typeof cards[0].id !== "undefined" && cards.length !== 0) {
                            await stripe.paymentIntents.create({
                                amount: calculateCost(),
                                customer: user.stripeAccountDetails.id,
                                currency: 'usd',
                                payment_method: cards[0].id,
                                description: `Purchased ${tokens} token's to be used on ${config.get("applicationName")} for various activities..`,
                                confirm: true
                            }, (err, charge) => {
                                if (err) {
                
                                    console.log("error with payment intent...", err);
                
                                    resppppp.json({
                                        message: "Error with payment logic!",
                                        err
                                    })
                                } else {
        
                                    user.tokens += tokens;
        
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
                                                message: "Purchased tokens successfully!",
                                                user
                                            })
                                        }
                                    })
                                }
                            });
                        } else {
                            resppppp.json({
                                message: "You do NOT have any listed payment methods on file!"
                            })
                        }
                    }
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

                        if (currentBal >= calculateCost()) {
                            if (user.stripeAccountVerified === true) {
                                const paymentIntention = await await stripe.charges.create({
                                    amount: calculateCost(),
                                    currency: 'usd',
                                    description: `Purchased ${tokens} token's to be used on ${config.get("applicationName")} for various activities..`,
                                    source: user.stripeAccountDetails.id
                                });
                
                                if (paymentIntention) {
                                    // add tokens
                                    user.tokens += tokens;
                
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
                                                message: "Purchased tokens successfully!",
                                                user
                                            })
                                        }
                                    })
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
});

module.exports = router;