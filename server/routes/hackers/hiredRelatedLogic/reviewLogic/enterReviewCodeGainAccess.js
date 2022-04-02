const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { id, accessCode, releventAssociatedContractID } = req.query;

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId: id }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const findIndexMatch = user.activeHiredHackingJobs.findIndex((item) => item.generatedID === releventAssociatedContractID);

            const match = user.activeHiredHackingJobs[findIndexMatch];

            if (accessCode === match.generatedAccessKeyReview) {
                resppppp.json({
                    message: "Code matches!"
                })
            } else {
                resppppp.json({
                    message: "Code does NOT match, try again!"
                })
            }
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