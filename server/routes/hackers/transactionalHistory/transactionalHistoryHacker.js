const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));

router.get("/", (req, resppppp, next) => {
    
    const { 
        uniqueId,
        accountType
    } = req.query;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const { id } = user.stripeAccountDetails;

            const transfers = await stripe.transfers.list({
                limit: 100,
                destination: id
            });

            const transactions = await stripe.paymentIntents.list({
                limit: 100
            }, {
                stripeAccount: id
            });

            if (transactions && transfers) {
                // customer account
                resppppp.json({
                    message: "Gathered previous transactions!",
                    transactions: [...transactions.data, ...transfers.data]
                })
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