const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { uniqueId } = req.query;

    const collection = Connection.db.db("db").collection("employers");

    collection.findOne({ uniqueId }).then((employerAccount) => {
        if (!employerAccount) {
            console.log("employerAccount does NOT exist or could not be found.");

            resppppp.json({
                message: "employerAccount does NOT exist or could not be found."
            })
        } else {
            console.log("employerAccount", employerAccount);

            resppppp.json({
                message: "Successfully gathered active/hired hackers!",
                hackers: employerAccount.activeHiredHackers
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