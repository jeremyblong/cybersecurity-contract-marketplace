const express = require("express");
const router = express.Router();
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));


router.get("/", async (req, resppppp, next) => {
    
    const { priceID } = req.query;

    const price = await stripe.prices.retrieve(priceID); 
    
    console.log("price:", price);

    resppppp.json({
        message: "Success!",
        priceData: price
    })
});

module.exports = router;