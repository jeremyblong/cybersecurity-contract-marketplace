const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {

    const { alreadyPooled } = req.query;

    const collection = Connection.db.db("db").collection("boostedemployerlistings");

    collection.aggregate([{ $sample: { size: 50 }}, { $project: {
        paymentMethods: 0,
        passbaseIDAccessKey: 0,
        stripeAccountDetails: 0,
        phoneNumber: 0,
        salt: 0,
        hash: 0,
        refreshToken: 0
    }}]).toArray((err, listings) => {
        if (err) {
            console.log(err);

            resppppp.json({
                message: "Error occurred while trying to gather employer 'general' listings...",
                err
            })
        } else {
            console.log("listings :", listings);

            resppppp.json({
                message: "Gathered general employer listings!",
                listings
            })
        }
    })
});

module.exports = router;