const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {

    const collection = Connection.db.db("db").collection("employerlistings");

    collection.aggregate([{ $sample: { size: 10 }}]).toArray((err, listings) => {
        if (err) {
            console.log(err);

            resppppp.json({
                message: "Error occurred while trying to gather employer 'general' listings...",
                err
            })
        } else {
            console.log("listings :", listings);

            resppppp.json({
                message: "Successfully gathered jobs!",
                listings
            })
        }
    })
});

module.exports = router;