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
                message: "Gathered related listings to choose from!",
                user
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