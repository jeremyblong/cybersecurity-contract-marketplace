const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { uniqueId, generatedID } = req.query;

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const findMatchIndex = user.activeHiredHackingJobs.findIndex((item) => item.generatedID === generatedID);

            resppppp.json({
                message: "Successfully gathered active hired data!",
                info: user.activeHiredHackingJobs[findMatchIndex]
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