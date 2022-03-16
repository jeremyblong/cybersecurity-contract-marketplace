const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.post("/", (req, resppppp, next) => {
    
    const { uniqueId, accountType, notification } = req.body;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOneAndUpdate({ uniqueId, "notifications.id": notification.id }, { $set: { "notifications.$.seenRead": true }}, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log("result does NOT exist or could not be found.", err);

            resppppp.json({
                message: "Result does NOT exist or could not be found."
            })
        } else {

            const filtered = result.value.notifications.findIndex((item) => item.id === notification.id);

            resppppp.json({
                message: "Marked notification as seen!",
                notifications: result.value.notifications,
                notification: result.value.notifications[filtered]
            })
        }
    });
});

module.exports = router;