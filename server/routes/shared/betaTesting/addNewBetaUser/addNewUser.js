const express = require("express");
const router = express.Router();
const NewBetaUser = require("../../../../schemas/betaTesting/addNewBetaUser.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const { encrypt } = require("../../../../crypto.js");


router.post("/", (req, resppppp, next) => {
    
    const { userEmail, fullName, accountType, signedinUserID, signedinFullName } = req.body;

    const MakeReferralID = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    };

    const newUserData = {
        id: uuidv4(),
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        fullName: fullName.toLowerCase().trim(),
        email: userEmail.toLowerCase().trim(),
        inviterID: signedinUserID,
        inviterFullName: signedinFullName,
        inviterAccountType: accountType,
        accepted: false,
        referralID: encrypt(MakeReferralID(10))
    };

    const newUserSchema = new NewBetaUser(newUserData);

    newUserSchema.save((err, result) => {
        if (err) {
            console.log("err saving..:", err);

            resppppp.json({
                message: "Error occurred while attempting to register new beta user..",
                err
            })
        } else {
            console.log("result", result);

            resppppp.json({
                message: "Successfully registered new 'beta' user!",
                result
            })
        }
    })
});

module.exports = router;
