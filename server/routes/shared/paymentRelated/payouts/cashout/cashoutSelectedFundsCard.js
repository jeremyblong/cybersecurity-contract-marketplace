const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));

router.post("/", (req, resppppp, next) => {
    
    const { 
        id,
        accountType,
        selectedCard,
        cost
    } = req.body;

    console.log("Req.body", req.body);

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId: id }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const stripeID = user.stripeAccountDetails.id;

            // connected account
            const payout = await stripe.payouts.create({
                amount: (cost * 100).toFixed(0),
                currency: 'usd',
                description: `'Cashout/payout' to desired/selected account for the amount of $${cost} which after initiated, should deposit into the desired account immediately. Transfering available funds to personal card/account via ${config.get("applicationName")}..`,
                destination: selectedCard.id,
                method: "instant",
                source_type: "card"
            }, {
                stripeAccount: stripeID,
            });

            if (payout) {
                console.log("payout", payout);

                resppppp.json({
                    message: "Cashed out funds!",
                    payout,
                    change: (cost * 100).toFixed(0)
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