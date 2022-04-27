const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const stripe = require('stripe')(config.get("stripeSecretKey"));
const _ = require("lodash");
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const {
        tutorialID,
        viewerID,
        viewingUserAccountType,
        viewingUserFullName,
        viewingUserLastProfilePicVideo,
        viewerMemberSince
    } = req.body;

    console.log("reqqqqqqqq", req.body);

    const collection = Connection.db.db("db").collection("tutorialshorts");

    const userDataToSave = {
        viewedBy: viewerID,
        viewedOnSystemDate: new Date(),
        viewedOnLegibleDate: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        id: uuidv4(),
        viewerMostRecentProfilePicVideo: viewingUserLastProfilePicVideo, 
        viewerName: viewingUserFullName, 
        memberSince: viewerMemberSince,
        accountType: viewingUserAccountType
    };

    collection.findOneAndUpdate({ id: tutorialID }, { "$addToSet": {
        "recentlyViewedProfileIDSOnly": viewerID
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

            const tutorial = result.value;

            if (modified === true) {
                // update the actual "view" user information array since it "doesnt" exist yet

                const newView = {
                    id: uuidv4(),
                    viewedBy: viewerID,
                    viewerName: viewingUserFullName
                }

                if (!tutorial.viewedBy.some(x => x.viewedBy === viewerID)) {
                    tutorial.viewedBy.push(newView);
                    tutorial.totalViews += 1;


                    collection.save(tutorial, (err, result) => {
                        if (err) {
                            console.log("err", err);

                            resppppp.json({
                                message: "An error occurred while 'marking profile view' & attempting to update DB data..",
                                err
                            })
                        } else {
                            console.log("result", result);

                            resppppp.json({
                                message: "Successfully marked view on tutorial!",
                                views: tutorial.totalViews,
                                result: userDataToSave,
                            })
                        }
                    })
                } else {
                    resppppp.json({
                        message: "Successfully marked view on tutorial!",
                        views: tutorial.totalViews,
                        result: null,
                    })
                }
            } else {
                // already exists... do NOTHING.
                resppppp.json({
                    message: "Successfully marked view on tutorial!",
                    views: tutorial.totalViews,
                    result: null,
                }) 
            }
        }
    });
});

module.exports = router;