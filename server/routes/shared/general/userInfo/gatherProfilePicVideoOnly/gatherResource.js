const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", async (req, resppppp, next) => {
    
    const { uniqueId } = req.query;

    const employerCollection = Connection.db.db("db").collection("employers");
    const hackerCollection = Connection.db.db("db").collection("hackers");

    const employerFound = await employerCollection.findOne({ uniqueId }, { fields: {
        profilePicsVideos: 1
    }});

    if (employerFound !== null) {
        resppppp.json({
            message: "Gathered resource!",
            file: employerFound.profilePicsVideos[employerFound.profilePicsVideos.length - 1]
        })
    } else {
        const hackerFound = await hackerCollection.findOne({ uniqueId }, { fields: {
            profilePicsVideos: 1
        }});

        if (hackerFound !== null) {
            resppppp.json({
                message: "Gathered resource!",
                file: hackerFound.profilePicsVideos[hackerFound.profilePicsVideos.length - 1]
            })
        } else {
            resppppp.json({
                message: "No data found!"
            })
        }
    }
});

module.exports = router;