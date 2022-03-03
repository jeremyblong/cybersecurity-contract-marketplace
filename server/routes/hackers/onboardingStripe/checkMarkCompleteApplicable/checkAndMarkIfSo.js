const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const _ = require("lodash");


router.post("/", (req, resppppp, next) => {
    
    const { userID } = req.body; 

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId: userID }).then( async (user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const account = await stripe.accounts.retrieve(user.stripeAccountDetails.id);

            console.log("account!!!", account);

            const chargesEnabled = account.charges_enabled;

            if (chargesEnabled === true) {
                if (_.has(user, "stripeAccountVerified")) {
                    user.stripeAccountVerified = true;
                } else {
                    user["stripeAccountVerified"] = true;
                }

                collection.save(user, (error, result) => {
                    if (error) {
                        console.log("an unknown error saving occurred...:", error);

                        resppppp.json({
                            message: "An error occurred while attempting to save/update user information!",
                            err: error
                        })
                    } else {
                        resppppp.json({
                            message: "Successfully marked onboarding as complete!",
                            user
                        })
                    }
                })
            } else {
                resppppp.json({
                    message: "User has NOT verified or onboarded their account yet successfully..",
                    user
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