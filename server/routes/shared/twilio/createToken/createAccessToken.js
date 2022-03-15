const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const Twilio = require("twilio");

router.get("/", (req, resppppp, next) => {
    
    const { uniqueId, accountType } = req.query;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const AccessToken = Twilio.jwt.AccessToken;
            
            // create twilio access token
            const token = new AccessToken(
                config.get("twilioAccountSID"),
                config.get("twilioApiSID"),
                config.get("twilioApiSecret"),
                { identity: user.uniqueId }
            );
            // create grants
            const VideoGrant = AccessToken.VideoGrant;
            const videoGrant = new VideoGrant();

            // grant access
            token.addGrant(videoGrant);

            resppppp.json({
                message: "Gathered user!",
                token
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