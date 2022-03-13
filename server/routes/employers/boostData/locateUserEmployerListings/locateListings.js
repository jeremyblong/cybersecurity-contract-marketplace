const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { id } = req.query;

    const collection = Connection.db.db("db").collection("employerlistings");

    collection.find({ postedBy: id }).toArray((err, listings) => {
        if (err) {
            console.log(err);

            resppppp.json({
                message: "Error occurred while attempting to fetch listings..",
                err
            })
        } else {
            console.log("listings", listings);

            resppppp.json({
                message: "Gathered related listings to choose from!",
                listings
            })
        }
    })
});

module.exports = router;