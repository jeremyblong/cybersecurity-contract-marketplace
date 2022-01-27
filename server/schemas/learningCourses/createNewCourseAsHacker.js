const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseDataListingCreation = new Schema({
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
    poster: {
        type: String
    },
    bookmarks: {
        type: Array
    },
    purchased: {
        type: Array
    }
});

module.exports = CreateNewCourse = mongoose.model("learningteachingcourse", CourseDataListingCreation);