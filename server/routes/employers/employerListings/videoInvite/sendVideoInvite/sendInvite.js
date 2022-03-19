const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const _ = require("lodash");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", async (req, resppppp, next) => {
    
    const { 
        id,
        accountType,
        otherUserID,
        otherUserName,
        date,
        time,
        signedinFullName,
        otherUserAccountType
    } = req.body;

    const collection = Connection.db.db("db").collection(accountType);
    const otherUserCollection = Connection.db.db("db").collection(otherUserAccountType);


    const otherUserResults = await otherUserCollection.findOne({ uniqueId: otherUserID });
    const authenticatedResults = await collection.findOne({ uniqueId: id });

    const generatedRoomID = uuidv4();
    const interviewID = uuidv4();

    const newNotification = {
        title: `You have been INVITED to a video conference/chat by the user named ${signedinFullName}!`,
        description: `You've been invited to attend an video conference/chat at approx. ${time.label} on the date of ${moment(date).format("MM/DD/YYYY hh:mm:ss a")}. Please arrive approx. 10 minutes early to properly prepare & show up on time. Click this link to be redirected to the appropriate changes!`,
        action: "video-invite",
        metadata: {
            attachments: {
                type: "object",
                attachment: {
                    date,
                    time,
                    generatedRoomID,
                    otherUserID: otherUserResults.uniqueId,
                    redirect: true
                }
            },
            from: id,
            other: null
        },
        id: uuidv4(),
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        seenRead: false
    }
    const pendingVideoInterviewAuthenticated = {
        id: interviewID,
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        seenRead: false,
        roomName: generatedRoomID,
        time,
        date_picked: date,
        with: otherUserName
    }
    const pendingVideoInterviewOtherUser = {
        id: interviewID,
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        seenRead: false,
        roomName: generatedRoomID,
        time,
        date_picked: date,
        with: otherUserName
    }

    if (otherUserResults !== null) {
        if (_.has(otherUserResults, "notifications")) {
            otherUserResults.notifications.push(newNotification);
        } else {
            otherUserResults["notifications"] = [newNotification];
        }
        if (_.has(otherUserResults, "pendingVideoCalls")) {
            otherUserResults.pendingVideoCalls.push(pendingVideoInterviewOtherUser);
        } else {
            otherUserResults["pendingVideoCalls"] = [pendingVideoInterviewOtherUser];
        }

        otherUserCollection.save(otherUserResults, (error, result) => {
            if (error) {
                console.log("err saving otherUserCollection:", error);
            } else {
                console.log("otherUserCollection result", result);

                if (authenticatedResults !== null) {
                    // process extra logic - carry on..
                    if (_.has(authenticatedResults, "pendingVideoCalls")) {
                        authenticatedResults.pendingVideoCalls.push(pendingVideoInterviewAuthenticated);
                    } else {
                        authenticatedResults["pendingVideoCalls"] = [pendingVideoInterviewAuthenticated];
                    }
            
                    collection.save(authenticatedResults, (errorSavingTwo, resultTwo) => {
                        if (errorSavingTwo) {
                            console.log("errorSavingTwo otherUserCollection:", errorSavingTwo);
                        } else {
                            console.log("otherUserCollection resultTwo", resultTwo);

                            resppppp.json({
                                message: "Sent invite successfully!",
                                user: authenticatedResults
                            })
                        }
                    })
                } else {
                    // cancel previous logic taken (notification + pending video call)..
                    otherUserResults.pendingVideoCalls = otherUserResults.pendingVideoCalls.filter((x) => x.id !== pendingVideoInterviewOtherUser.id);

                    otherUserResults.notifications = otherUserResults.notifications.filter((x) => x.id !== newNotification.id);

                    otherUserCollection.save(otherUserResults, (errorBacktracking, resultBacktracking) => {
                        if (errorBacktracking) {
                            console.log("err saving otherUserCollection:", errorBacktracking);
                        } else {
                            console.log("otherUserCollection resultBacktracking", resultBacktracking);
                        }
                    });
                }
            }
        })
    } else {
        resppppp.json({
            message: "User does NOT exist or could not be found."
        })
    }
});

module.exports = router;