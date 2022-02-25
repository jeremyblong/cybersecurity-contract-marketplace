const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.post("/", async (req, resppppp, next) => {
    
    const { jobID, userID } = req.body;

    const archivedCollections = Connection.db.db("db").collection("archivedemployerlistings");
    const employerCollections = Connection.db.db("db").collection("employerlistings");

    const foundOrNotArchived = await archivedCollections.findOne({ uniqueId: jobID });

    if (foundOrNotArchived !== null) {
        console.log("foundOrNotArchived ran.");
        // found item - SKIP lookup in other collection and process logic..

        resppppp.json({
            message: "Successfully gathered appropriate info!",
            listingInfo: foundOrNotArchived
        })
    } else {
        // did NOT find item - look through LIVE listings collection to find desired data..
        const normalListingCollection = await employerCollections.findOne({ uniqueId: jobID });

        if (normalListingCollection !== null) {
            console.log("normalListingCollection ran.");
            // found item!

            resppppp.json({
                message: "Successfully gathered appropriate info!",
                listingInfo: normalListingCollection
            })
        } else {
            // did not find in either collections - return error result

            resppppp.json({
                message: "Unknown error occurred and could not locate desired listing data.."
            })
        }
    }
});

module.exports = router;