const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {

    const { alreadyPooled } = req.query;

    const collection = Connection.db.db("db").collection("boostedemployerprofiles");

    collection.aggregate([{ $sample: { size: 35 } }]).toArray((err, employers) => {
        if (err) {
            console.log("Error occurred while gathering employers...");

            resppppp.json({
                message: "Error occurred while gathering employers...",
                err
            })
        } else {
            resppppp.json({
                message: "Successfully gathered employers!",
                employers
            })
        }
    })
});

module.exports = router;