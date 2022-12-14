const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const Session = new Schema({
    refreshToken: {
      type: String,
      default: "",
    }  
})

const UserSchema =  new Schema({
    firstName: {
        type: String,
        default: ""
    }, 
    applicants: {
        type: Array
    },
    lastName: {
        type: String,
        default: ""
    }, 
    referral: {
        type: Schema.Types.Mixed
    },
    authyId: {
        type: Number
    },
    phoneNumber: {
        type: String
    },
    stripeAccountVerified: {
        type: Boolean
    },
    stripeAccountDetails: {
        type: Object
    },
    referralCode: {
        type: String
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
    tokens: {
        type: Number
    },
    accountType: {
        type: String
    },
    password: {
        type: Object
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
    authStrategy: {
        type: String,
        default: "local"
    },
    points: {
        type: Number,
        default: 0
    },
    refreshToken: {
        type: [Session]
    }
});

UserSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken
      return ret
    }
});
  
UserSchema.plugin(passportLocalMongoose)


module.exports = User = mongoose.model("employer", UserSchema);