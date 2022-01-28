const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", (req, resppppp, next) => {
    
    const { 
        applicantId,
        deniedJobID,
        publicCompanyName,
        listingDescription,
        employerID
    } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

    const newNotification = {
        title: `Unfortunately, You have NOT been chosen/selected for the job with the ID of ${deniedJobID} with the Co. ${publicCompanyName}. This is your alert/notification of denial.`,
        description: "We're sad to inform you of this news but unfortunately you weren't selected so there's nothing we can do HOWEVER we do HIGHLY suggest applying to many jobs/gigs as we have a large user base which can make being selected a difficult or small odds/change. Good luck on future endeavors!",
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
    }

    collection.findOneAndUpdate({ uniqueId: applicantId }, { $push: { notifications: newNotification }}, (err, result) => {
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