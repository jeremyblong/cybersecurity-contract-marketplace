const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const { signedinUserID, blogID, signedinLastProfileFile, signedinUserNameFull, signedinMemberSince, accountType } = req.body;

    const collection = Connection.db.db("db").collection("restrictedblogs");

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

    collection.findOneAndUpdate({ id: blogID }, { "$addToSet": {
        "recentlyViewedProfileIDSOnly": signedinUserID
    }}, (err, result) => {
        if (err) {
            console.log("err", err);

            resppppp.json({
                message: "Error attempting to update DB and check existing...",
                err
            })
        } else {
            console.log("RESULT", result);

            const modified = result.lastErrorObject.updatedExisting;

            const blogData = result.value;

            if (modified === true) {
                // update the actual "view" user information array since it "doesnt" exist yet

                const newView = {
                    id: uuidv4(),
                    viewedBy: signedinUserID,
                    viewerName: signedinUserNameFull
                }

                if (!blogData.viewedBy.some(x => x.viewedBy === signedinUserID)) {
                    blogData.viewedBy.push(newView);
                    blogData.totalViews += 1;


                    collection.save(blogData, (err, result) => {
                        if (err) {
                            console.log("err", err);

                            resppppp.json({
                                message: "An error occurred while 'marking profile view' & attempting to update DB data..",
                                err
                            })
                        } else {
                            console.log("result", result);

                            resppppp.json({
                                message: "Found user & modified/marked view in DB!",
                                result: userDataToSave,
                                modified
                            })
                        }
                    })
                } else {
                    resppppp.json({
                        message: "Found user & modified/marked view in DB!",
                        result: null,
                        modified
                    })  
                }
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