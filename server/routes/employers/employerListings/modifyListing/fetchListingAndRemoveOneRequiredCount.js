const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.post("/", (req, resppppp, next) => {
    
    const { listingId, newMaxNumberOfApplicantsObj } = req.body;

    console.log("request-body fetchListingAndRemoveOneREquiredCount:" , req.body);

    const collection = Connection.db.db("db").collection("employerlistings");

    collection.findOneAndUpdate({ uniqueId: listingId }, { $set: { maxNumberOfApplicants: newMaxNumberOfApplicantsObj }}, { returnOriginal: false }, (error, result) => {
        if (error) {
            console.log("error", error);

            resppppp.json({
                message: "Error occurred while attempting to modify listing information...",
                err: error
            })
        } else {
            console.log("Successfully MODIFIED existing employer listing required hacker count...:", result);

            resppppp.json({
                message: "Successfully modified existing listing document and reduced one from hacker required count!",
                result
            })
        }
    });
});

module.exports = router;