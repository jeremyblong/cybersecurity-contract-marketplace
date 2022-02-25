const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { alreadyPooled } = req.query;

    const collection = Connection.db.db("db").collection("softwareforsalelistings");

    collection.find({}).toArray((err, listings) => {
        if (err) {
            resppppp.json({
                message: "An error occurred while attempting to gather listings!",
                err
            })
        } else {
            resppppp.json({
                message: "Successfully gathered listing items!",
                listings
            })
        }
    })
});

module.exports = router;