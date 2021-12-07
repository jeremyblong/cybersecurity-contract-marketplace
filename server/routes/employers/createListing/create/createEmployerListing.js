const express = require("express");
const router = express.Router();
const Listing = require("../../../../schemas/listings/employer/createNewListing.js");
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const { uniqueId, data } = req.body;

    const newListing = new Listing({
        ...data,
        postedBy: uniqueId,
        postedDate: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        systemDate: Date.now(),
        applicants: []
    });

    newListing.save((err, result) => {
        if (err) {
            console.log(err);

            resppppp.json({
                message: "Error saving new listing data...",
                err
            });
        } else {
            resppppp.json({
                message: "Successfully posted a new employer listing!",
                data: result
            });
        }
    })
});

module.exports = router;