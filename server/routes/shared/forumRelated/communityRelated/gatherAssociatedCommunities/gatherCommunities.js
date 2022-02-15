const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { signedinID } = req.query;

    const collection = Connection.db.db("db").collection("forumcommunities");

    collection.find({ $or: [ { "members.$.userID": signedinID }, { "communityManagers.$.userID": signedinID }, { "communityModerators.$.userID": signedinID }, { mainAdmin: signedinID } ] }).toArray((err, communities) => {
        if (err) {
            console.log("Could not find related communities as an error occurred...");

            resppppp.json({
                message: "Could not find related communities as an error occurred...",
                err
            })
        } else {
            console.log("communities", communities);

            resppppp.json({
                message: "Successfully fetched the desired communities!",
                communities
            })
        }
    })
});

module.exports = router;