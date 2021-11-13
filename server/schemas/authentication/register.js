const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema({
    firstName: {
        type: String
    }, 
    lastName: {
        type: String
    }, 
    email: {
        type: String
    }, 
    username: {
        type: String
    }, 
    password: {
        type: String
    }, 
    agreement: {
        type: Boolean
    },
    uniqueId: {
        type: String
    },
    registrationDate: {
        type: Date
    },
    registrationDateString: {
        type: String
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
    }
});

module.exports = User = mongoose.model("hacker", UserSchema);