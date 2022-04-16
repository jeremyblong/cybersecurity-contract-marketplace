const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {

    const collection = Connection.db.db("db").collection("hackers");

    const fields = {
        firstName: 1,
        lastName: 1,
        email: 1,
        username: 1,
        accountType: 1,
        uniqueId: 1,
        registrationDate: 1,
        registrationDateString: 1,
        reviews: 1,
        fullyVerified: 1,
        identityVerified: 1,
        followingHackers: 1,
        followingCompanies: 1,
        points: 1,
        experiencePoints: 1,
        rankLevel: 1,
        title: 1,
        publicEmailAddress: 1,
        aboutMe: 1,
        yearsOfExperience: 1,
        birthdate: 1,
        gender: 1,
        profilePicsVideos: 1,
        profileBannerImage: 1,
        previouslyAppliedJobs: 1,
        activeHiredHackingJobs: 1,
        recentlyViewedProfileViews: 1,
        recentlyViewedProfileIDSOnly: 1,
        totalUniqueViews: 1,
        bookmarkedProfiles: 1,
        profileLovesHearts: 1,
        currentlyFollowedBy: 1,
        profilePosts: 1,
        tokens: 1
    };

    collection.aggregate([{ $sample: { size: 20 } }, { $project: fields }]).toArray((err, hackers) => {
        if (err) {
            console.log("Error occurred while gathering hackers...", err);

            resppppp.json({
                message: "Error occurred while gathering hackers...",
                err
            })
        } else {
            console.log("hackers", hackers);

            resppppp.json({
                message: "Successfully gathered hackers!",
                hackers
            })
        }
    })
});

module.exports = router;