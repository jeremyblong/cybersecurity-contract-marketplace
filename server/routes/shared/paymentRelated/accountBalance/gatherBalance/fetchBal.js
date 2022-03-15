const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));

router.get("/", (req, resppppp, next) => {
    
    const { 
        uniqueId,
        accountType
    } = req.query;

    console.log("Req.query", req.query);

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
            // customer account
            if (accountType === "employers") {
                const customer = await stripe.customers.retrieve(user.stripeAccountDetails.id);

                if (customer) {
                    const currentBal = customer.balance;

                    resppppp.json({
                        message: "Gathered balance!",
                        bal: currentBal
                    })
                }
            } else {
                // connected account
                const balance = await stripe.balance.retrieve({
                    stripeAccount: id
                });

                console.log("balance", balance);

                if (balance) {
                    resppppp.json({
                        message: "Gathered balance!",
                        bal: balance
                    })
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