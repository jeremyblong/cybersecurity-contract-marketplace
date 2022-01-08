const express = require("express");
const router = express.Router();
const { Connection } = require("../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {

    const collection = Connection.db.db("db").collection("hackers");

    collection.aggregate([{ $sample: { size: 20 } }]).toArray((err, hackers) => {
        if (err) {
            console.log("Error occurred while gathering hackers...");

            resppppp.json({
                message: "Error occurred while gathering hackers...",
                err
            })
        } else {
            resppppp.json({
                message: "Successfully gathered hackers!",
                hackers
            })
        }
    })
});

module.exports = router;