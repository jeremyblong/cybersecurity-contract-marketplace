const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const config = require("config");
const Twilio = require("twilio");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');


router.get("/", (req, resppppp, next) => {
    
    const { uniqueId, accountType, generatedRoomID } = req.query;

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
                config.get("twilioApiSecret")
            );
            // create grants
            const VideoGrant = AccessToken.VideoGrant;
            const videoGrant = new VideoGrant({
                room: generatedRoomID
            });

            token.identity = generatedRoomID;

            // grant access
            token.addGrant(videoGrant);

            const tokenized = token.toJwt();

            user["activeVideoChatRoom"] = {
                tokenized,
                id: uuidv4(),
                systemDate: new Date(),
                date: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                roomName: generatedRoomID
            }

            collection.save(user, (errorSaving, result) => {
                if (errorSaving) {
                    console.log("errorSaving", errorSaving);

                    resppppp.json({
                        message: "An error occurred while saving updated information..",
                        err: errorSaving
                    })
                } else {
                    console.log("Result", result);

                    resppppp.json({
                        message: "Gathered user!",
                        token: tokenized
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