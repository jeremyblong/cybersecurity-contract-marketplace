const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { alreadyPooled } = req.query;

    const collection = Connection.db.db("db").collection("forumcommunities");

    // sort by top 100 groups decending order max sample size 100 items/documents
    collection.aggregate([{
        $sample: { size: 100 }
    }, {
        $sort: { "likes":-1 }
    }, {
        $limit: 100
    }]).toArray((err, communities) => {
        if (err) {
            console.log("Could not find related communities as an error occurred...", err);

            resppppp.json({
                message: "Could not find related communities as an error occurred...",
                err
            })
        } else {
            console.log("communities", communities);

            resppppp.json({
                message: "Successfully gathered communities!",
                communities
            })
        }
    })
});

module.exports = router;