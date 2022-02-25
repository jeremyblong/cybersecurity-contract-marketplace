const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewSoftwareForSaleListingCreate = new Schema({
    auctionPriceRelatedData: {
        type: Object
    },
    auctionPurchaseType: {
        type: String
    },
    category: {
        type: Object
    },
    codingLanguageContent: {
        type: Object
    },
    commentToReviewer: {
        type: String
    },
    demoURL: {
        type: String
    },
    description: {
        type: String
    },
    previouslyAppliedJobs: {
        type: Array
    },
    hashtags: {
        type: Array
    },
    listingTitle: {
        type: String
    },
    listingTimespan: {
        type: Object
    },
    screenshotUploadImages: {
        type: Array
    },
    supportExternalURL: {
        type: String
    },
    supportProvidedExternalURL: {
        type: Boolean
    },
    supportResponseTimespanData: {
        type: Object
    },
    thumbnailImage: {
        type: Object
    },
    uploadedPublicFiles: {
        type: Array
    },
    videoDemoFile: {
        type: Object
    },
    uniqueId: {
        type: String
    },
    date: {
        type: Date
    }, 
    systemDate: {
        type: Number
    },
    poster: {
        type: String
    },
    responses: {
        type: Array
    },
    bookmarks: {
        type: Number
    },
    likes: {
        type: Number
    },
    bids: {
        type: Schema.Types.Mixed
    },
    currentBidPrice: {
        type: Schema.Types.Mixed
    }
});

module.exports = ListingCreate = mongoose.model("softwareForSaleListing", NewSoftwareForSaleListingCreate);