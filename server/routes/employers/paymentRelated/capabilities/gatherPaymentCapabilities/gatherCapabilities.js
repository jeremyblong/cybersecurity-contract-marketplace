const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));


router.get("/", (req, resppppp, next) => {
    
    const { employerID } = req.query;

    const collection = Connection.db.db("db").collection("employers");

    collection.findOne({ uniqueId: employerID }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const capabilities = await stripe.accounts.listCapabilities(user.stripeAccountDetails.id);

            resppppp.json({
                message: "Successfully gathered payment capabilities!",
                capabilities
            })
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