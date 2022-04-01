const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const { signedinUserID, softwareListingID, bidPrice, posterID, signedinUserFullName } = req.body;

    const collection = Connection.db.db("db").collection("softwareforsalelistings");

    collection.findOne({ uniqueId: softwareListingID }).then((listing) => {
        if (!listing) {
            console.log("listing does NOT exist or could not be found.");

            resppppp.json({
                message: "listing does NOT exist or could not be found."
            })
        } else {
            console.log("listing", listing);

            const currentPrice = listing.currentBidPrice;

            const newBidObject = {
                bidDate: new Date(),
                bidDateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                id: uuidv4(),
                amount: Number(bidPrice),
                bidderID: signedinUserID,
                bidderName: signedinUserFullName
            }

            if (bidPrice >= currentPrice) {

                listing.bids.push(newBidObject);

                listing.currentBidPrice = Number(bidPrice);

                collection.save(listing, (errSaving, successResult) => {
                    if (errSaving) {
                        console.log("errSaving", errSaving);

                        resppppp.json({
                            message: "An error occurred while attempting to save new data/changes!",
                            err: errSaving
                        })
                    } else {
                        console.log("successResult", successResult);

                        resppppp.json({
                            message: "Successfully placed a bid!",
                            listing,
                            newlyPlacedBid: bidPrice
                        })
                    }
                })
            } else {
                resppppp.json({
                    message: "Error, enter a value higher than the existing bid price!"
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