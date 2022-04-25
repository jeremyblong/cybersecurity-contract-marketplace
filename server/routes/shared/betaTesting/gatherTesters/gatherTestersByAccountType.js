const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const {} = req.query;

    const collection = Connection.db.db("db").collection("betatesters");

    collection.aggregate([{ $sample: { size: 50 }}, { $match: { accepted: false } }]).toArray((err, betatesters) => {
        if (err) {
            console.log("Could not find related betatesters as an error occurred...", err);

            resppppp.json({
                message: "Could not find related betatesters as an error occurred...",
                err
            })
        } else {
            console.log("betatesters", betatesters);

            resppppp.json({
                message: "Successfully gathered default testers!",
                testers: betatesters
            })
        }
    })
});

module.exports = router;