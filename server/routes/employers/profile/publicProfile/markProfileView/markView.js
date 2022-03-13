const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const _ = require("lodash");


router.post("/", (req, resppppp, next) => {
    
    const { signedinUserID, viewingEmployerAccountID, signedinLastProfileFile, signedinUserNameFull, signedinMemberSince, accountType } = req.body;

    const collection = Connection.db.db("db").collection("employers");

    const userDataToSave = {
        viewedBy: signedinUserID,
        viewedOnSystemDate: new Date(),
        viewedOnLegibleDate: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        id: uuidv4(),
        viewerMostRecentProfilePicVideo: signedinLastProfileFile, 
        viewerName: signedinUserNameFull, 
        memberSince: signedinMemberSince,
        accountType
    };

    collection.findOne({ uniqueId: viewingEmployerAccountID }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {

            if (_.has(user, "recentlyViewedProfileIDSOnly")) {
                if (!user.recentlyViewedProfileIDSOnly.includes(signedinUserID)) {
                    user.recentlyViewedProfileIDSOnly.push(signedinUserID)
                } 
            } else {
                user["recentlyViewedProfileIDSOnly"] = [signedinUserID];
            }

            if (_.has(user, "recentlyViewedProfileViews")) {
                // user has NOT alredy viewed this person's profile
                if (!user.recentlyViewedProfileIDSOnly.includes(signedinUserID)) {
                    user.recentlyViewedProfileViews.push(userDataToSave);
                } 
            } else {
                user["recentlyViewedProfileViews"] = [userDataToSave];
            }

            if (_.has(user, "totalUniqueViews")) {
                // increase view count...
                // user has NOT alredy viewed this person's profile
                if (!user.recentlyViewedProfileIDSOnly.includes(signedinUserID)) {
                    user.totalUniqueViews += 1;
                };
            } else {
                user["totalUniqueViews"] = 1;
            }

            collection.save(user, (savingError, result) => {
                if (savingError) {
                    console.log("error saving...:", savingError);

                    resppppp.json({
                        message: "Error saving data to database - check error code.",
                        err: savingError
                    })
                } else {
                    console.log("SUCCESSFULLY saved!");
                    // return response
                    resppppp.json({
                        message: "Found user & modified/marked view in DB!",
                        result: userDataToSave
                    })
                }
            })
        }
    });
});

module.exports = router;