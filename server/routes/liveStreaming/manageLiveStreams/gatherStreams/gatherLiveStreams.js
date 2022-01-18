const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const axios = require("axios");
const config = require("config");

router.get("/", (req, resppppp, next) => {
    
    const { alreadyPooled } = req.query;

    const collection = Connection.db.db("db").collection("livestreaminglistings");

    collection.aggregate([{ $sample: { size: 20 } }]).toArray((err, liveStreams) => {
        if (err) {
            console.log("Error occurred while gathering live-streams...");
        } else {

            const configuration = {
                auth: {
                  username: config.get("muxAccessTokenID"),
                  password: config.get("muxSecretKey")
                }
            };

            axios.get("https://api.mux.com/video/v1/live-streams", configuration).then((res) => {
                if (res.data.data) {
                    console.log(res.data);

                    const stillActiveStreams = res.data.data.filter((stream, idx) => {
                        if (stream.status === "active") {
                            return true;
                        } else {
                            return false;
                        }
                    });

                    const newlyCreatedFinalArray = [];
                    
                    if (typeof liveStreams !== "undefined" && liveStreams.length > 0) {
                        for (let index = 0; index < liveStreams.length; index++) {
                            const stream = liveStreams[index];
                            
                            for (let idx = 0; idx < stillActiveStreams.length; idx++) {
                                const activeStream = stillActiveStreams[idx];
                                console.log("stream", stream);
                                console.log("activeStream", activeStream);

                                if (stream.streamkey === activeStream.stream_key) {
                                    newlyCreatedFinalArray.push({
                                        streamkey: activeStream.stream_key,
                                        playback_id: activeStream.playback_ids[0].id,
                                        activated: true,
                                        ...stream
                                    });
                                }

                                if ((liveStreams.length - 1) === index) {
                                    resppppp.json({
                                        message: "Gathered ALL live streams!",
                                        liveStreams: newlyCreatedFinalArray
                                    })
                                }
                            }
                        }
                    } else {
                        resppppp.json({
                            message: "Gathered ALL live streams!",
                            liveStreams: []
                        })   
                    }
                } else {
                    console.log("Err", res.data);

                    resppppp.json({
                        message: "Gathered DB streams however UNABLE to fetch 'live' MUX streams (inner error)..."
                    })
                }
            }).catch((error) => {
                console.log(error);

                resppppp.json({
                    message: "Gathered DB streams however UNABLE to fetch 'live' MUX streams...",
                    err: error
                })
            })
        }
    });
});

module.exports = router;