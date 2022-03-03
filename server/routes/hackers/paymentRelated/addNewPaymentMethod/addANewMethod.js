const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const { encrypt } = require("../../../../crypto.js");


router.post("/", (req, resppppp, next) => {
    
    const { 
        number,
        name, 
        expiry, 
        cvc,
        hackerID,
        cardType
    } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

    const newPaymentAddition = {
        number: encrypt(number),
        lastFour: number.replace(/\d(?=\d{4})/g, "*"),
        name, 
        expiry, 
        cvc: encrypt(cvc),
        id: uuidv4(),
        dateAddedFormatted: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        dateAddedRaw: new Date(),
        cardType
    }

    collection.findOneAndUpdate({ uniqueId: hackerID }, { $addToSet: { paymentMethods: newPaymentAddition }}, { returnOriginal: false }, async (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("result", result);

            const { id } = result.value.stripeAccountDetails;

            const source = {
                card: {
                    number,
                    exp_month: expiry.substring(0, 2),
                    exp_year: expiry.substring(2, 4),
                    cvc,
                    name,
                    currency: "usd"
                }
            };

            console.log("source", source);

            await stripe.tokens.create(source).then(async (dataaaaaa) => {
                // log response
                console.log("DATA!:", dataaaaaa);
                // continue w/logic..

                const external = await stripe.accounts.createExternalAccount(id, { external_account: dataaaaaa.id }, async (err, result) => {
                    if (!err) {
                        resppppp.json({
                            message: "Successfully added a new payment method!",
                            account: newPaymentAddition
                        })
                    } else {
                        console.log("err", err);

                        const message = err.raw.message;

                        const pulled = await collection.findOneAndUpdate({ uniqueId: hackerID }, { $pull: { paymentMethods: { id: newPaymentAddition.id } } });

                        if (pulled) {
                            resppppp.json({
                                message: "An error has occurred while attempting to create the desired card data...",
                                err: message
                            })
                        }
                    }
                });
            });
        }
    })
});

module.exports = router;