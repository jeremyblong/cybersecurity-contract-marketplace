const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const { signedinUserID, viewingHackerAccountID, signedinLastProfileFile, signedinUserNameFull, signedinMemberSince, accountType } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

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

    collection.updateOne({ uniqueId: viewingHackerAccountID }, { $addToSet: {
        recentlyViewedProfileIDSOnly: signedinUserID
    }}, (err, result) => {
        if (err) {
            console.log("err", err);

            resppppp.json({
                message: "Error attempting to update DB and check existing...",
                err
            })
        } else {
            console.log("RESULT", result);

            const modified = result.result.nModified === 1 ? true : false;

            if (modified === true) {
                // update the actual "view" user information array since it "doesnt" exist yet
                
                resppppp.json({
                    message: "Found user & modified/marked view in DB!",
                    result: userDataToSave,
                    modified
                })
            } else {
                // already exists... do NOTHING.
                resppppp.json({
                    message: "Found user & modified/marked view in DB!",
                    result: null,
                    modified
                })   
            }
        }
    });
});

module.exports = router;