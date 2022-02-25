const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const _ = require("lodash");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", (req, resppppp, next) => {
    
    const { jobID, userID, hackerID, publicCompanyName, employerPostedJobId } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId: hackerID }).then((hacker) => {
        if (!hacker) {
            console.log("hacker does NOT exist or could not be found.");

            resppppp.json({
                message: "hacker does NOT exist or could not be found."
            })
        } else {
            console.log("hacker", hacker);

            const generatedID = uuidv4();

            const newNotification = {
                title: `You're employer ${publicCompanyName} has requested an update for a job they've employed you on. Please circle back with this employer with an update(s)..`,
                description: "This employer has intentionally requested an update from you, employer's have the option to periodically request updates so please circle back with them with any/all updates regarding the specific hack at hand (whether physical OR digital) make sure to respond.",
                metadata: {
                    attachments: {
                        data: {
                            jobID
                        },
                        type: null,
                        attachment: null
                    },
                    from: userID,
                    other: null
                },
                id: generatedID,
                date: new Date(),
                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                seenRead: false
            }

            if (_.has(hacker, "notifications")) {
                hacker.notifications.push(newNotification);
            } else {
                hacker["notifications"] = [newNotification];
            }

            const findMatchActiveJob = hacker.activeHiredHackingJobs.findIndex((x) => x.employerPostedJobId === employerPostedJobId);

            const match = hacker.activeHiredHackingJobs[findMatchActiveJob];

            const newHiredJobData = {
                ...match,
                responses: [...match.responses, {
                    title: `You're employer ${publicCompanyName} has requested an update for a job they've employed you on. Please circle back with this employer with an update(s)..`,
                    description: "This employer has intentionally requested an update from you, employer's have the option to periodically request updates so please circle back with them with any/all updates regarding the specific hack at hand (whether physical OR digital) make sure to respond.",
                    id: uuidv4(),
                    initiator: userID,
                    pendingUpdateWaiting: true,
                    responseRequired: true,
                    postedJobID: employerPostedJobId,
                    date: new Date(),
                    formattedDate: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a")
                }]
            }

            hacker.activeHiredHackingJobs[findMatchActiveJob] = newHiredJobData;

            collection.save(hacker, (errrrrr, result) => {
                if (errrrrr) {
                    console.log("errrrrr", errrrrr);

                    resppppp.json({
                        message: "Error occurred while attempting to modify listing information...",
                        err: errrrrr
                    })
                } else {
                    resppppp.json({
                        message: "Successfully notified the hacker of request!"
                    })
                }
            })
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err
        })
    })
});

module.exports = router;