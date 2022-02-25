const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));


router.post("/", (req, resppppp, next) => {
    
    const { 
        hackerID, 
        paymentID
    } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOneAndUpdate({ uniqueId: hackerID }, { $pull: { paymentMethods: { id: paymentID }}}, { returnOriginal: false }, async (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("result", result);

            const paymentMethod = await stripe.paymentMethods.detach(
                'pm_1KSUn9Cq2blL6mnOYwzCG2XG'
            );

            const { paymentMethods } = result.value;

            if (paymentMethod) {
                resppppp.json({
                    message: "Successfully deleted the desired payment method!",
                    payments: paymentMethods
                })
            }
        }
    })
});

module.exports = router;