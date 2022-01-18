const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewLiveStreamSchema = new Schema({
    streamVisibility: {
        type: Object
    },
    streamMainCategory: {
        type: Object
    },
    streamMainDescription: {
        type: String
    },
    streamHashtags: {
        type: Array
    },
    streamSubCategory: {
        type: Object
    },
    listingTitle: {
        type: String
    },
    streamCodingLanguage: {
        type: Object
    },
    id: {
        type: String
    },
    systemDate: {
        type: Date
    },
    date: {
        type: String
    },
    views: {
        type: Number
    },
    streamkey: {
        type: String
    },
    currentViewers: {
        type: Number
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    },
    comments: {
        type: Array
    },
    poster: {
        type: String
    },
    posterUsername: {
        type: String
    },
    posterName: {
        type: String
    }
});

module.exports = NewLiveStream = mongoose.model("livestreaminglistings", NewLiveStreamSchema);