const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { applicantId } = req.query;

    const collection = Connection.db.db("db").collection("employerlistings");

    collection.findOne({ "applicants.applicantId": applicantId }).then((listing) => {
        if (!listing) {
            console.log("listing does NOT exist or could not be found.");

            resppppp.json({
                message: "listing does NOT exist or could not be found."
            })
        } else {
            console.log("listing", listing);

            resppppp.json({
                message: "Successfully gathered previous applications!",
                applicants: listing.applicants
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