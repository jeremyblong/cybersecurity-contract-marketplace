const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewShortTutorialCourse = new Schema({
    mainData: {
        type: Object
    },
    id: {
        type: String
    },
    date: {
        type: Date
    },
    dateString: {
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
    posterName: {
        type: String
    },
    posterID: {
        type: String
    },
    bookmarks: {
        type: Array
    },
    purchased: {
        type: Array
    }
});

module.exports = NewTutorialCourse = mongoose.model("tutorialshort", NewShortTutorialCourse);