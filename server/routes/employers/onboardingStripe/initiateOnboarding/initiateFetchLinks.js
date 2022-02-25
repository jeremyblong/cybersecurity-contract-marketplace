const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));

router.get("/", (req, resppppp, next) => {
    
    const { userID } = req.query; 

    const collection = Connection.db.db("db").collection("employers");

    collection.findOne({ uniqueId: userID }).then(async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            await stripe.accountLinks.create({
                account: user.stripeAccountDetails.id,
                refresh_url: `${config.get("frontendUrl")}/employer/account/signup/flow/payment/related`,
                return_url: `${config.get("frontendUrl")}/successful/onboarding/process/stripe/employer/account`,
                type: 'account_onboarding',
            }, (err, result) => {
                if (err) {
                    console.log("err creating links", err);
                } else {
                    console.log("Success creating links!");

                    resppppp.json({
                        message: "Successfully activated stripe onboarding process!",
                        link: result.url
                    })
                }
            });
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