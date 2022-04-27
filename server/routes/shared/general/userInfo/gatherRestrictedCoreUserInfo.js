const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", async (req, resppppp, next) => {
    
    const { uniqueId } = req.query;

    const hackerCollection = Connection.db.db("db").collection("hackers");
    const employerCollection = Connection.db.db("db").collection("employers");

    const hackerMatch = await hackerCollection.findOne({ uniqueId });
    const employerMatch = await employerCollection.findOne({ uniqueId });

    if (hackerMatch !== null) {
        hackerCollection.findOne({ uniqueId }, { fields: {
            firstName: 1,
            lastName: 1,
            username: 1,
            registrationDate: 1,
            completedJobs: 1,
            reviews: 1,
            followingHackers: 1,
            followingCompanies: 1,
            profilePicsVideos: 1,
            title: 1,
            publicEmailAddress: 1,
            aboutMe: 1,
            yearsOfExperience: 1,
            birthdate: 1,
            gender: 1,
            experiencePoints: 1,
            rankLevel: 1,
            profileBannerImage: 1,
            points: 1,
            fullyVerified: 1,
            uniqueId: 1,
            premierAccountStatus: 1,
            experienceMultiplier: 1,
            subscriptionData: 1,
            profileLovesHearts: 1,
            recentlyViewedProfileViews: 1
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
    } else if (employerMatch !== null) {
        employerCollection.findOne({ uniqueId }, { fields: {
            firstName: 1,
            lastName: 1,
            username: 1,
            registrationDate: 1,
            completedJobs: 1,
            reviews: 1,
            followingHackers: 1,
            followingCompanies: 1,
            profilePicsVideos: 1,
            title: 1,
            publicEmailAddress: 1,
            aboutMe: 1,
            yearsOfExperience: 1,
            birthdate: 1,
            gender: 1,
            experiencePoints: 1,
            rankLevel: 1,
            profileBannerImage: 1,
            points: 1,
            fullyVerified: 1,
            uniqueId: 1,
            premierAccountStatus: 1,
            experienceMultiplier: 1,
            subscriptionData: 1,
            profileLovesHearts: 1,
            recentlyViewedProfileViews: 1
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
    } else {
        resppppp.json({
            message: "Unknown error."
        })
    }
});

module.exports = router;