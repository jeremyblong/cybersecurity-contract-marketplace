const express = require("express");
const router = express.Router();
const ListingCreate = require("../../../../../../schemas/listings/hackers/createNewSoftwareSaleListing.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");



router.post("/", (req, resppppp, next) => {
    
    const { previouslySavedSoftwareData, signedID } = req.body;

    console.log("req.body - ", req.body);

    const { 
        auctionPriceRelatedData, 
        auctionPurchaseType, 
        category, 
        codingLanguageContent, 
        commentToReviewer, 
        demoURL, 
        description, 
        hashtags, 
        listingTitle, 
        listingTimespan, 
        screenshotUploadImages, 
        supportExternalURL, 
        supportProvidedExternalURL, 
        supportResponseTimespanData, 
        thumbnailImage, 
        uploadedPublicFiles, 
        videoDemoFile
    } = previouslySavedSoftwareData;

    const newListing = new ListingCreate({
        auctionPriceRelatedData, 
        auctionPurchaseType, 
        category, 
        codingLanguageContent, 
        commentToReviewer, 
        demoURL, 
        description, 
        hashtags, 
        listingTitle, 
        listingTimespan, 
        screenshotUploadImages, 
        supportExternalURL, 
        supportProvidedExternalURL, 
        supportResponseTimespanData, 
        thumbnailImage, 
        uploadedPublicFiles, 
        videoDemoFile, 
        uniqueId: uuidv4(), 
        date: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"), 
        systemDate: new Date(), 
        poster: signedID, 
        responses: [], 
        bookmarks: 0, 
        likes: 0,
        bids: auctionPriceRelatedData.auctionSelectedType.includes("auction") ? [] : undefined,
        currentBidPrice: auctionPriceRelatedData.auctionSelectedType.includes("auction") ? auctionPriceRelatedData.startBid || 0 : undefined
    });

    newListing.save((error, data) => {
        if (error) {
            console.log("error", error);

            resppppp.json({
                message: "An error occurred while attempting to post your new listing...",
                err: error
            })
        } else {
            console.log("data", data);

            resppppp.json({
                message: "Successfully posted new software listing!",
                data
            })
        }
    })
});

module.exports = router;