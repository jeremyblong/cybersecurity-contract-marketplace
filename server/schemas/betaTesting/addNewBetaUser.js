const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewBetaUserSchema = new Schema({
    id: {
        type: String
    },
    date: {
        type: Date
    },
    dateString: {
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    inviterID: {
        type: String
    },
    inviterFullName: {
        type: String
    },
    inviterAccountType: {
        type: String
    },
    accepted: {
        type: Boolean
    },
    referralID: {
        type: Object
    }
});

module.exports = NewBetaUser = mongoose.model("betatester", NewBetaUserSchema);