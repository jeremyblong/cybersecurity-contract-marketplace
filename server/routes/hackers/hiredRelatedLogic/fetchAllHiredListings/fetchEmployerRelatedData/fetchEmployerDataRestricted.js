const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { employerID } = req.query;

    const collection = Connection.db.db("db").collection("employers");

    collection.findOne({ uniqueId: employerID }, { fields: {
        firstName: 1,
        lastName: 1,
        username: 1,
        registrationDate: 1,
        completedJobs: 1,
        reviews: 1,
        followingHackers: 1,
        followingCompanies: 1,
        profilePicsVideos: 1,
        publicEmailAddress: 1,
        rankLevel: 1,
        profileBannerImage: 1,
        points: 1,
        fullyVerified: 1,
        uniqueId: 1,
        profileLovesHearts: 1,
        currentlyFollowedBy: 1
    }}).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            resppppp.json({
                message: "Successfully gathered core user information!",
                user
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