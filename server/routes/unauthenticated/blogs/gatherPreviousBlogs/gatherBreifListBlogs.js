const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {

    const collection = Connection.db.db("db").collection("blogsmains");

    collection.aggregate([{ $sample: { size: 8 } }]).toArray((err, blogs) => {
        if (err) {
            console.log("Could NOT gather snippet of existing blogs..");

            resppppp.json({
                message: "Could NOT gather snippet of existing blogs..",
                err
            })
        } else {
            console.log("blogs", blogs);

            resppppp.json({
                message: "Successfully gathered blogs snippet!",
                blogs
            })
        }
    })
});

    module.exports = router;