const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {

    const collection = Connection.db.db("db").collection("tutorialshorts");

    collection.aggregate([{ $sample: { size: 100 } }]).toArray((err, tutorials) => {
        if (err) {
            resppppp.json({
                message: "An error occurred while attempting to gather tutorials!",
                err
            })
        } else {
            resppppp.json({
                message: "Successfully gathered tutorials!",
                tutorials
            })
        }
    })
});

module.exports = router;