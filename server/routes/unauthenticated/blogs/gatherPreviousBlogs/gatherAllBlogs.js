const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {

    const collection = Connection.db.db("db").collection("blogsmains");

    collection.aggregate([{ $sample: { size: 20 } }]).toArray((err, blogs) => {
        if (err) {
            console.log("Could not find related blogs as an error occurred...");

            resppppp.json({
                message: "Could not find related blogs as an error occurred...",
                err
            })
        } else {
            console.log("blogs", blogs);

            resppppp.json({
                message: "Gathered blogs!",
                blogs
            })
        }
    })
});

module.exports = router;