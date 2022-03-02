const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));


router.get("/", (req, resppppp, next) => {
    
    const { employerID, elementID } = req.query;

    const collection = Connection.db.db("db").collection("employers");

    collection.findOne({ uniqueId: employerID }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const capability = await stripe.accounts.updateCapability(
                user.stripeAccountDetails.id,
                elementID,
                {
                    requested: true
                }
            );

            console.log("capability", capability);

            if (typeof capability.requirements.currently_due !== "undefined" && capability.requirements.currently_due.length > 0) {
                // need to complete more onboarding steps..

                resppppp.json({
                    message: "You must enable further 'onboarding settings' before activating this setting..",
                    currentlyDue: capability.requirements.currently_due
                })
            } else {
                // good to go!
                resppppp.json({
                    message: "Successfully modified payment capabilities!",
                    capability,
                    elementID
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