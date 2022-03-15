const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const { 
    decryptObject
} = require("../../../../../crypto-js.js");

router.post("/", (req, resppppp, next) => {
    
    const { 
        id,
        accountType,
        cardInfo,
        cost
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

            const decrypted = decryptObject(cardInfo);

            if (accountType === "employers") {
                console.log("using typed custom card info");
                // using typed custom card info
                await stripe.paymentMethods.create({
                    type: 'card',
                    card: {
                        number: decrypted.number,
                        exp_month: decrypted.expiry.substring(0, 2),
                        exp_year: decrypted.expiry.substring(2, 4),
                        cvc: decrypted.cvc,
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
            } else {
                console.log("using typed custom card info three");

                const source = {
                    card: {
                        number: decrypted.number,
                        exp_month: decrypted.expiry.substring(0, 2),
                        exp_year: decrypted.expiry.substring(2, 4),
                        cvc: decrypted.cvc,
                        name: decrypted.name,
                        currency: "usd"
                    }
                };
    
                console.log("source", source);
    
                await stripe.tokens.create(source).then(async (dataaaaaa) => {
                    // log response
                    console.log("DATA!:", dataaaaaa);
                    // continue w/logic..
                    await stripe.charges.create({
                        amount: totalCost,
                        currency: "usd",
                        description: `Deposited funds into account adding to ${config.get("applicationName")} platform balance!`,
                        source: dataaaaaa.id,
                        capture: true
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

                            resppppp.json({
                                message: "Successfully deposited funds!",
                                user
                            })
                        }
                    });
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