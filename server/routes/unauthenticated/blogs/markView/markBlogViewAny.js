const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", async (req, resppppp, next) => {
    
    const { id } = req.query;

    const collection = Connection.db.db("db").collection("blogsmains");

    collection.findOneAndUpdate({ id }, { $inc: { totalViews: 1 }}, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log("doc", doc);

            resppppp.json({
                message: "Successfully marked view!"
            })
        }
    });
});

module.exports = router;