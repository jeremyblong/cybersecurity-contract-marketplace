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
    lastName: {
        type: String,
        default: ""
    }, 
    email: {
        type: String,
        default: ""
    }, 
    username: {
        type: String,
        default: ""
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
    },
    experiencePoints: {
        type: Number
    },
    rankLevel: {
        type: Number
    }
});

UserSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken
      return ret
    }
});
  
UserSchema.plugin(passportLocalMongoose)


module.exports = User = mongoose.model("hacker", UserSchema);