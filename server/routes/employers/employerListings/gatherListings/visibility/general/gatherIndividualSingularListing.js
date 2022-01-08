const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { listingId } = req.query;

    const collection = Connection.db.db("db").collection("employerlistings");

    collection.findOne({ uniqueId: listingId }).then((listing) => {
        if (!listing) {
            resppppp.json({
                message: "listing does NOT exist or could not be found."
            })
        } else {
            resppppp.json({
                message: "Successfully gathered listing information!",
                listing
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