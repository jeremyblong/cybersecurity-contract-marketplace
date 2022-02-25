const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { hackerID } = req.query;

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId: hackerID }, { fields: { paymentMethods: 1 }}).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const { paymentMethods } = user;

            resppppp.json({
                message: "Successfully gathered existing payment method's!",
                paymentMethods
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