const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.post("/", (req, resppppp, next) => {
    
    const { listingId, newMaxNumberOfApplicantsObj, applicantID } = req.body;

    console.log("request-body fetchListingAndRemoveOneREquiredCount:" , req.body);

    const collection = Connection.db.db("db").collection("employerlistings");

    collection.findOne({ uniqueId: listingId }).then((listing) => {
        if (!listing) {
            console.log("listing does NOT exist or could not be found.");

            resppppp.json({
                message: "Error occurred while attempting to modify listing information...",
                err: error
            })
        } else {
            listing.maxNumberOfApplicants = newMaxNumberOfApplicantsObj;
            listing.applicants.filter(applicant => applicant !== applicantID);

            collection.save(listing, (errrrrr, result) => {
                if (errrrrr) {
                    console.log("errrrrr", errrrrr);

                    resppppp.json({
                        message: "Error occurred while attempting to modify listing information...",
                        err: errrrrr
                    })
                } else {
                    resppppp.json({
                        message: "Successfully modified existing listing document and reduced one from hacker required count!",
                        result
                    })
                }
            })
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Error occurred while attempting to modify listing information...",
            err: error
        })
    })
});

module.exports = router;