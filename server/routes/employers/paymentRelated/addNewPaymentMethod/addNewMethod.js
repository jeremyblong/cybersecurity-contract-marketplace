const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const { encrypt } = require("../../../../crypto.js");


router.post("/", (req, resppppp, next) => {
    
    const { 
        number,
        name, 
        expiry, 
        cvc,
        employerID,
        cardType
    } = req.body;

    console.log("req.body", req.body);

    const collection = Connection.db.db("db").collection("employers");

    const newPaymentAddition = {
        number: encrypt(number),
        lastFour: number.replace(/\d(?=\d{4})/g, "*"),
        name, 
        expiry, 
        cvc: encrypt(cvc),
        id: uuidv4(),
        dateAddedFormatted: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        dateAddedRaw: new Date(),
        cardType
    }

    collection.findOneAndUpdate({ uniqueId: employerID }, { $addToSet: { paymentMethods: newPaymentAddition }}, { returnOriginal: false }, async (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("result", result);

            const { id } = result.value.stripeAccountDetails;

            await stripe.paymentMethods.create({
                type: 'card',
                card: {
                  number,
                  exp_month: expiry.substring(0, 2),
                  exp_year: expiry.substring(2, 4),
                  cvc,
                },
            }, async (errrrrrrr, successData) => {
                if (errrrrrrr) {
                    console.log(errrrrrrr);
                } else {
                    console.log("successData", successData);

                    const paymentMethod = await stripe.paymentMethods.attach(successData.id, { customer: id });

                    if (paymentMethod) {
                        resppppp.json({
                            message: "Successfully added a new payment method!",
                            newPaymentAddition
                        })
                    } else {
                        resppppp.json({
                            message: "An error has occurred while attempting to create the desired card data..."
                        })
                    }
                }
            });
        }
    })
});

module.exports = router;