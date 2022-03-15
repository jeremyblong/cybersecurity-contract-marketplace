const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));



router.get("/", (req, resppppp, next) => {
    
    const { id, accountType } = req.query;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId: id }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {

            const { id } = user.stripeAccountDetails;
            // hackers are connected account
            if (accountType === "employers") {
                const paymentMethods = await stripe.paymentMethods.list({
                    customer: id,
                    type: 'card',
                });
    
                if (paymentMethods) {
                    resppppp.json({
                        message: "Gathered employer payment cards!",
                        cards: paymentMethods.data
                    })
                }  
            } else {
                const accountCards = await stripe.accounts.listExternalAccounts(id, { object: 'card' });

                if (accountCards) {
                    resppppp.json({
                        message: "Gathered employer payment cards!",
                        cards: accountCards.data
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