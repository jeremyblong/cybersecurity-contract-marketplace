const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { alreadyPooled } = req.query;

    const gamblingCollection = Connection.db.db("db").collection("bettinggamblinglistings");

    gamblingCollection.aggregate([{ $sample: { size: 20 } }]).toArray((err, listings) => {
        if (err) {
            resppppp.json({
                message: "An error occurred while attempting to gather listings!",
                err
            })
        } else {
            resppppp.json({
                message: "Successfully gathered avaliable listings to be bet/bid on!",
                listings
            })
        }
    })
});

module.exports = router;