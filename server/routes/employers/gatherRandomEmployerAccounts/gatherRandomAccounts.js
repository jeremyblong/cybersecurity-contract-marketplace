const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {

    const collection = Connection.db.db("db").collection("employers");

    collection.aggregate([{ $sample: { size: 20 } }, { $project: {
        paymentMethods: 0,
        passbaseIDAccessKey: 0,
        stripeAccountDetails: 0,
        phoneNumber: 0,
        salt: 0,
        hash: 0,
        refreshToken: 0
    }}]).toArray((err, employers) => {
        if (err) {
            console.log("Error occurred while gathering employers...");

            resppppp.json({
                message: "Error occurred while gathering employers...",
                err
            })
        } else {
            resppppp.json({
                message: "Successfully gathered employers!",
                employers
            })
        }
    })
});

module.exports = router;