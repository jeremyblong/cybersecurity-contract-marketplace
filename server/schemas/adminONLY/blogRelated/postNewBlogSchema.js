const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewBlogPostSchema = new Schema({
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
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    body: {
        type: String
    }
});

module.exports = CreateANewBlogPost = mongoose.model("blogsmain", NewBlogPostSchema);