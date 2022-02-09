const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BettingGamblingSchema = new Schema({
    id: {
        type: String
    },
    date: {
        type: Date
    },
    formattedDate: {
        type: String
    },
    hiredHackers: {
        type: Array
    },
    allBids: {
        type: Array
    },
    startDate: {
        type: Date
    },
    originalListingData: {
        type: Object
    },
    listingIDToMatch: {
        type: String
    },
    maxedEndDate: {
        type: Date
    },
    hostedBy: {
        type: String
    },
    activeHackers: {
        type: Number
    }
});

module.exports = GamblingSchema = mongoose.model("bettinggamblinglisting", BettingGamblingSchema);