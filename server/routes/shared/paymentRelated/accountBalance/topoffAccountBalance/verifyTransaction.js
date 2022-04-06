const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));



router.post("/", async (req, resppppp, next) => {

    console.log("runnnnnnning...");
    
    const { accountID, chargeID, amount } = req.body;

    const transfer = await stripe.transfers.create({
        amount: amount,
        currency: "usd",
        source_transaction: chargeID,
        destination: accountID,
    });

    if (transfer) {
        resppppp.json({
            message: "Successfully transferred funds!"
        })
    } else {
        resppppp.json({
            message: "Transfer failed - an error occurred.."
        })
    }
});

module.exports = router;