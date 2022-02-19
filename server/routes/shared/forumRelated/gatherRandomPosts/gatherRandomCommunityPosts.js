const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const {  } = req.query;

    const collection = Connection.db.db("db").collection("forumcommunities");

    collection.aggregate([{ $sample: { size: 25 }}, { $match: { subthreads: { $not: { $size: 0 } }} }]).toArray((err, communities) => {
        if (err) {
            console.log("Could not find related communities as an error occurred...");

            resppppp.json({
                message: "Could not find related communities as an error occurred...",
                err
            })
        } else {
            console.log("communities", communities);

            resppppp.json({
                message: "Successfully gathered random posts!",
                communities
            })
        }
    })
});

module.exports = router;