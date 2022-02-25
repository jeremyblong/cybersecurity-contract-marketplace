const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ForumCommunitySchema = new Schema({
    id: {
        type: String
    },
    date: {
        type: Date
    },
    dateString: {
        type: String
    },
    communityName: {
        type: String
    },
    groupVisibility: {
        type: String
    },
    members: {
        type: Array
    },
    subthreads: {
        type: Array
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    },
    reactionsToCommunity: {
        type: Object
    },
    communityManagers: {
        type: Array
    },
    communityModerators: {
        type: Array
    },
    mainAdmin: {
        type: String
    },
    communityMainPic: {
        type: Object
    }
});

module.exports = CreateNewForumCommunity = mongoose.model("forumcommunity", ForumCommunitySchema);