const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArchivedListingSchema = new Schema({
    assetArray: {
        type: Array
    }, 
    comments: {
        type: Array
    },
    likedBy: {
        type: Array
    },
    applicantIDArray: {
        type: Array
    },
    likes: {
        type: Number
    },
    dislikedBy: {
        type: Array
    },
    dislikes: {
        type: Number
    },
    totalViews: {
        type: Number
    },
    viewedBy: {
        type: Array
    },
    typeOfHack: {
        type: Object
    }, 
    testingDatesHackers: {
        type: Array
    }, 
    rulesOfEngagement: {
        type: String
    }, 
    publicCompanyName: {
        type: String
    }, 
    outOfScopeVulnerabilities: {
        type: String
    }, 
    listingDescription: {
        type: String
    }, 
    uniqueId: {
        type: String
    },
    hashtags: {
        type: Array
    }, 
    businessAddress: {
        type: Object
    }, 
    requiredRankToApply: {
        type: Object
    }, 
    experienceAndCost: {
        type: Object
    }, 
    desiredSkills: {
        type: Array
    }, 
    maxNumberOfApplicants: {
        type: Object
    }, 
    disclosureVisibility: {
        type: Object
    }, 
    tokensRequiredToApply: {
        type: Object
    }, 
    listingVisibility: {
        type: Object
    }, 
    estimatedCompletionDate: {
        type: String
    },  
    uploadedFiles: {
        type: Array
    },
    postedBy: {
        type: String
    },
    postedDate: {
        type: String
    },
    systemDate: {
        type: Number
    },
    applicants: {
        type: Array
    }
});

module.exports = ArchivedListing = mongoose.model("archivedemployerlisting", ArchivedListingSchema);