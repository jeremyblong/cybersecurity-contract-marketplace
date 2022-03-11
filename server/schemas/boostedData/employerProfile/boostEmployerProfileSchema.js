const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BoostedEmployerProfileSchema = new Schema({
    createdAt: { 
        type: Number
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
    firstName: {
        type: String,
        default: ""
    }, 
    lastName: {
        type: String,
        default: ""
    }, 
    email: {
        type: String,
        default: ""
    }, 
    currentlyFollowedBy: {
        type: Array
    },
    username: {
        type: String,
        default: ""
    }, 
    accountType: {
        type: String
    },
    agreement: {
        type: Boolean
    },
    uniqueId: {
        type: String,
        default: ""
    },
    registrationDate: {
        type: Date
    },
    registrationDateString: {
        type: String,
        default: ""
    },
    completedJobs: {
        type: Number
    },
    reviews: {
        type: Array
    },
    fullyVerified: {
        type: Boolean
    },
    identityVerified: {
        type: Boolean
    },
    followingHackers: {
        type: Array
    },
    followingCompanies: {
        type: Array
    },
    points: {
        type: Number,
        default: 0
    },
    profilePicsVideos: {
        type: Array
    },
    profileBannerImage: {
        type: Object
    }
}, { timestamps: true });

const createNewBoostedProfileSchema = (seconds, data) => {
    console.log("createNewBoostedProfileSchema data... ", seconds, data);

    BoostedEmployerProfileSchema.index({ createdAt: 1 }, { expireAfterSeconds: seconds });

    const BoostedEmployerListing = mongoose.model("boostedemployerprofile", BoostedEmployerProfileSchema);

    return new BoostedEmployerListing(data);
}

module.exports = createNewBoostedProfileSchema;