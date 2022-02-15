const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');


router.post("/", (req, resppppp, next) => {
    
    const { id, accountType, fullName, from, communityName } = req.body;

    const collection = Connection.db.db("db").collection(accountType);

    const newNotificationAddition = {
        title: `You've recieved a new group invite to community/forum on our platform, ${fullName} searched for your specific name to invite you personally to the newly created '${communityName}' community..`,
        description: `Congrat's on your new group invite, select whether or not you'd like to join the community '${communityName}'... ${fullName} would like you to be a member of this group so we recommend joining!`,
        metadata: {
            attachments: [],
            from,
            other: null
        },
        id: uuidv4(),
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        seenRead: false
    }

    collection.findOneAndUpdate({ uniqueId: id }, { $push: { notifications: newNotificationAddition }}, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log(err);

            resppppp.json({
                message: "An error occurred while attempting to notify user...",
                err
            })
        } else {
            console.log(result);

            resppppp.json({
                message: "Successfully notified specific user!"
            })
        }
    });
});

module.exports = router;