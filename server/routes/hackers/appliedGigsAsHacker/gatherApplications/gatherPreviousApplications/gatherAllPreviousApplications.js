const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const axios = require("axios");
const config = require("config");

router.get("/", (req, resppppp, next) => {
    
    const { uniqueId } = req.query;

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId }, { fields: { previouslyAppliedJobs: 1 }}).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            resppppp.json({
                message: "Successfully gathered active/hired applications!",
                applications: user.previouslyAppliedJobs
            })
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err
        })
    });
});

module.exports = router;