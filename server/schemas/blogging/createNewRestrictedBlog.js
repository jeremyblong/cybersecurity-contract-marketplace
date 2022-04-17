const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RestrictedBlogSchema = new Schema({
    id: {
        type: String
    },
    date: {
        type: Date
    },
    dateString: {
        type: String
    },
    title: {
        type: String
    },
    posterName: {
        type: String
    },
    tippedUsers: {
        type: Array
    },
    posterAccountType: {
        type: String
    },
    subtitle: {
        type: String
    },
    hashtags: {
        type: Array
    },
    description: {
        type: String
    },
    posterID: {
        type: String
    },
    likedBy: {
        type: Array
    },
    dislikedBy: {
        type: Array
    },
    viewedBy: {
        type: Array
    },
    viewedByList: {
        type: Array
    },
    totalTipAmount: {
        type: Number
    },
    comments: {
        type: Array
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    },
    totalViews: {
        type: Number
    },
    bookmarks: {
        type: Array
    },
    purchased: {
        type: Array
    },
    displayImage: {
        type: String
    }
});

module.exports = RestrictedBlogCreation = mongoose.model("restrictedblog", RestrictedBlogSchema);