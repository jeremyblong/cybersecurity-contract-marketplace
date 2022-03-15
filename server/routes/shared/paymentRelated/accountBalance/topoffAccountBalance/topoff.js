const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));


router.post("/", (req, resppppp, next) => {
    
    const { 
        id,
        accountType,
        existingCard,
        cardInfo,
        cost,
        selectedPaymentCard
    } = req.body;

    console.log("Req.body", req.body);

    const totalCost = Math.floor(cost) * 100;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId: id }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            if (accountType === "employers") {
                if (existingCard === true) {
                    console.log("using pre-existing card data");
                    // using pre-existing card data
            
                    await stripe.paymentIntents.create({
                        amount: totalCost,
                        customer: user.stripeAccountDetails.id,
                        currency: 'usd',
                        payment_method: selectedPaymentCard.value.id,
                        description: `Deposited funds into account adding to ${config.get("applicationName")} platform balance!`,
                        confirm: true
                    }, async (err, charge) => {
                        if (err) {
                            resppppp.json({
                                message: "Error with payment logic!",
                                err
                            })
                        } else {
                            console.log("charge", charge);
    
                            const balanceTransaction = await stripe.customers.createBalanceTransaction(user.stripeAccountDetails.id, { amount: totalCost, currency: 'usd' });

                            if (balanceTransaction) {
                                console.log("balanceTransaction", balanceTransaction);

                                resppppp.json({
                                    message: "Successfully deposited funds!",
                                    user
                                })
                            }
                        }
                    });
                } else {
                    console.log("using typed custom card info");
                    // using typed custom card info
                    await stripe.paymentMethods.create({
                        type: 'card',
                        card: {
                          number: cardInfo.number,
                          exp_month: cardInfo.expiry.substring(0, 2),
                          exp_year: cardInfo.expiry.substring(2, 4),
                          cvc: cardInfo.cvc,
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
                                    amount: totalCost,
                                    customer: user.stripeAccountDetails.id,
                                    currency: 'usd',
                                    payment_method: successData.id,
                                    description: `Deposited funds into account adding to ${config.get("applicationName")} platform balance!`,
                                    confirm: true
                                }, async (err, charge) => {
                                    if (err) {
                                        resppppp.json({
                                            message: "Error with payment logic!",
                                            err
                                        })
                                    } else {
                                        console.log("charge", charge);
                
                                        const balanceTransaction = await stripe.customers.createBalanceTransaction(user.stripeAccountDetails.id, { amount: totalCost, currency: 'usd' });

                                        if (balanceTransaction) {
                                            console.log("balanceTransaction", balanceTransaction);

                                            resppppp.json({
                                                message: "Successfully deposited funds!",
                                                user
                                            })
                                        }
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
                if (existingCard === true) {
                    console.log("using pre-existing card data");
                    // using pre-existing card data
            
                    await stripe.paymentIntents.create({
                        amount: totalCost,
                        customer: user.stripeAccountDetails.id,
                        currency: 'usd',
                        payment_method: selectedPaymentCard.value.id,
                        description: `Deposited funds into account adding to ${config.get("applicationName")} platform balance!`,
                        confirm: true
                    }, async (err, charge) => {
                        if (err) {
                            resppppp.json({
                                message: "Error with payment logic!",
                                err
                            })
                        } else {
                            console.log("charge", charge);

                            const topup = await stripe.topups.create({
                                amount: totalCost,
                                currency: 'usd',
                                description: `Deposited funds into account adding to ${config.get("applicationName")} platform balance!`,
                                statement_descriptor: 'Top-up',
                            });
    
                            if (topup) {
                                resppppp.json({
                                    message: "Successfully deposited funds!",
                                    user
                                })
                            }
                        }
                    });
                } else {
                    console.log("using typed custom card info three");

                    const source = {
                        card: {
                            number: cardInfo.number,
                            exp_month: cardInfo.expiry.substring(0, 2),
                            exp_year: cardInfo.expiry.substring(2, 4),
                            cvc: cardInfo.cvc,
                            name: cardInfo.name,
                            currency: "usd"
                        }
                    };
        
                    console.log("source", source);
        
                    await stripe.tokens.create(source).then(async (dataaaaaa) => {
                        // log response
                        console.log("DATA!:", dataaaaaa);
                        // continue w/logic..
        
                        await stripe.accounts.createExternalAccount(user.stripeAccountDetails.id, { external_account: dataaaaaa.id }, async (err, result) => {
                            if (!err) {
                                console.log("inner running magically! :) ", result);
                                
                                if (result) {

                                    await stripe.charges.create({
                                        amount: totalCost,
                                        currency: "usd",
                                        description: `Deposited funds into account adding to ${config.get("applicationName")} platform balance!`,
                                        source: result.id,
                                    }, {
                                        stripeAccount: user.stripeAccountDetails.id
                                    }, async (err, charge) => {
                                        if (err) {
                                            console.log(err);
                                            
                                            resppppp.json({
                                                message: "Error with payment logic!",
                                                err
                                            })
                                        } else {
                                            console.log("charge", charge);
            
                                            const topup = await stripe.topups.create({
                                                amount: totalCost,
                                                currency: 'usd',
                                                description: `Deposited funds into account adding to ${config.get("applicationName")} platform balance!`,
                                                statement_descriptor: 'Top-up',
                                            });
                    
                                            if (topup) {
                                                resppppp.json({
                                                    message: "Successfully deposited funds!",
                                                    user
                                                })
                                            }
                                        }
                                    });
                                }
                            } else {
                                console.log("err", err);
                            }
                        });
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