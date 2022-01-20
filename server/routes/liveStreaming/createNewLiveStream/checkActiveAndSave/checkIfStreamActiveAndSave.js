const express = require("express");
const router = express.Router();
const config = require("config");
const axios = require("axios");
const { Connection } = require("../../../../mongoUtil.js");
const moment = require("moment");
const NewLiveStream = require("../../../../schemas/liveStreams/createNewStream/newStreamSchema.js");

router.post("/", async (req, res, next) => {
   // deconstruct new stream info
    const { streamID, streamInformationCustomized, posterID, posterUsername, posterName, streamKey, channelUrl } = req.body;

    // create OBJ to be saved to mongodb...
    const objToBeSaved = {
        ...streamInformationCustomized,
        systemDate: new Date(),
        date: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        currentViewers: 0,
        likes: 0,
        dislikes: 0,
        comments: [],
        poster: posterID,
        views: 0,
        posterUsername, 
        posterName,
        streamkey: streamKey,
        channelUrl
    };
    // configuration for MUX
    const configuration = {
        auth: {
          username: config.get("muxAccessTokenID"),
          password: config.get("muxSecretKey")
        }
    };

    axios.get(`https://api.mux.com/video/v1/live-streams/${streamID}`, configuration).then((response) => {
        console.log("response data", response.data);
        if (response.data.data.status === "idle") {
            res.json({
                message: "Stream is currently IDLE - NOT live yet..."
            })
        } else if (response.data.data.status === "active") {

            const NewStream = new NewLiveStream(objToBeSaved);

            NewStream.save((errSaving, result) => {
                if (errSaving) {
                    console.log("errSaving", errSaving);

                    res.json({
                        message: "An error occurred while attempting to save/modify DB information...",
                        err: errSaving
                    })
                } else {
                    res.json({
                        message: "STREAM IS ACTIVATED & LIVE!"
                    })
                }
            })
        } else {
            res.json({
                message: "An UNKNOWN state occurred while deciphering stream status!"
            })
        }
    }).catch((error) => {
        console.log("Error", error);

        res.json({
            message: "Error occurred while fetching live stream data!",
            err: error
        })
    })
});

module.exports = router; 