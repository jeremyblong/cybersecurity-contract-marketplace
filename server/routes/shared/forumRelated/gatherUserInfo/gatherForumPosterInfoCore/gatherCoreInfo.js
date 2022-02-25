const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { selectedThreadID, poster } = req.query;

    const hackerCollection = Connection.db.db("db").collection("hackers");
    const forumCollection = Connection.db.db("db").collection("forumcommunities");
    const employerCollection = Connection.db.db("db").collection("employers");

    const checkBothAccountTypesPromise = new Promise(async (resolve, reject) => {
        // run first check 50/50 possibility of match...
        const firstCheck = await hackerCollection.findOne({ uniqueId: poster }, { fields: {
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
            uniqueId: 1
        }}).then(user => user); 

        if (firstCheck === null) {
            // user NOT found... check OTHER database of account types.. run second check!
            const secondCheck = await employerCollection.findOne({ uniqueId: poster }, { fields: {
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
                uniqueId: 1
            }}).then(user => user); 

            if (secondCheck === null) {
                // didnt find this user either - something is wrong
                resolve(null);
            } else {
                // found match finally...!
                resolve(secondCheck);
            }
        } else {
            // USER FOUND - RESOLVE and return response...!

            resolve(firstCheck);
        }
    })

    checkBothAccountTypesPromise.then( async (userData) => {

        const matchingPost = await forumCollection.findOne({ "subthreads.id": selectedThreadID }).then(community => community);

        const findMatchingIndex = matchingPost.subthreads.findIndex((thread) => thread.id === selectedThreadID);

        const resultMatchingViaIndex = matchingPost.subthreads[findMatchingIndex];

        if (userData !== null) {
            resppppp.json({
                message: "Successfully gathered core user information!",
                user: userData,
                listing: resultMatchingViaIndex
            })
        } else {
            resppppp.json({
                message: "An error occurred while attempting to locate the appropriate user's data..."
            })
        }
    })
});

module.exports = router;