const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", (req, resppppp, next) => {
    
    const { 
        applicantId,
        acceptedJobID,
        publicCompanyName,
        listingDescription,
        employerID,
        applicantData,
        listingInfo
    } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

    const newNotification = {
        title: `Fortunately, You have been SELECTED/PICKED for a job with the ID of ${acceptedJobID} with the Co. ${publicCompanyName}. This is your alert/notification of APPROVAL/ACCEPTANCE.`,
        description: "We're happy to inform you of this news and are excited to make you aware of this new change! You will now be immediately assigned to this job & we'll get the ball rolling, Contact the employer for more information. Good luck on future endeavors!",
        metadata: {
            attachments: {
                type: "string",
                attachment: listingDescription
            },
            from: employerID,
            other: null
        },
        id: uuidv4(),
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        seenRead: false
    };

    const newHackingJob = {
        id: uuidv4(),
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        employerPostedListingInfo: {
            ...listingInfo
        },
        ...applicantData,
        hired: true
    }

    collection.findOneAndUpdate({ uniqueId: applicantId }, { $push: { notifications: newNotification, activeHiredHackingJobs: newHackingJob }}, (err, result) => {
        if (err) {
            console.log("err sending alert!", err);
            // maybe try another attempt?
        } else {
            console.log("result", result);

            resppppp.json({
                message: "Alerted user with notification!"
            })
        }
    });
});

module.exports = router;