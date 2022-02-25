const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { activeHiredID, employerID } = req.query;

    const collection = Connection.db.db("db").collection("employers");

    collection.findOne({ uniqueId: employerID }).then((employer) => {
        if (!employer) {
            console.log("Employer does NOT exist or could not be found.");

            resppppp.json({
                message: "Employer does NOT exist or could not be found."
            })
        } else {
            console.log("employer", employer);

            const findMatchingHacker = employer.activeHiredHackers.findIndex((hacker) => hacker.id === activeHiredID);

            const currentApplication = employer.activeHiredHackers[findMatchingHacker];

            console.log("currentApplication", currentApplication);

            resppppp.json({
                message: "Successfully gathered appropriate info!",
                currentHires: employer.activeHiredHackers.length,
                reviews: employer.reviews.length,
                currentApplication
            });
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