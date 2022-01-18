const express = require("express");
const router = express.Router();
const Mux = require('@mux/mux-node');
const config = require("config");
// const { Connection } = require("../mongoUtil.js");

router.get("/", async (req, res, next) => {
    
    const { Video } = new Mux(config.get("muxAccessTokenID"), config.get("muxSecretKey"));

    const result = await Video.LiveStreams.create({
        playback_policy: 'public',
        new_asset_settings: { 
            playback_policy: 'public'
        }
    }); 

    if (result) {
        res.json({
            message: "We've generated your stream key!",
            streamKey: result.stream_key,
            result
        })
    }
});

module.exports = router; 