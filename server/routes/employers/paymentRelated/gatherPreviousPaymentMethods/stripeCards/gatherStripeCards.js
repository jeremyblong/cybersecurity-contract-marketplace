const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));



router.get("/", (req, resppppp, next) => {
    
    const { id } = req.query;

    const collection = Connection.db.db("db").collection("employers");

    collection.findOne({ uniqueId: id }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {

            const { id } = user.stripeAccountDetails;

            const paymentMethods = await stripe.paymentMethods.list({
                customer: id,
                type: 'card',
            });

            if (paymentMethods) {
                resppppp.json({
                    message: "Gathered employer payment cards!",
                    cards: paymentMethods
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