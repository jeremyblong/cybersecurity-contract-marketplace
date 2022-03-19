const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { id, accountType, videocallID } = req.query;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId: id }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const indexed = user.pendingVideoCalls.findIndex((item) => item.id === videocallID);

            resppppp.json({
                message: "Gathered info!",
                videoCall: user.pendingVideoCalls[indexed]
            })
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err
        })
    })
});

module.exports = router;