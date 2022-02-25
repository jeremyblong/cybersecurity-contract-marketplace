const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { searchText } = req.query;

    console.log("Search text", searchText);

    const employerCollection = Connection.db.db("db").collection("employers");
    const hackerCollection = Connection.db.db("db").collection("hackers");

    const searching = searchText.toLowerCase();

    const promiseBoth = new Promise((resolve, reject) => {
        employerCollection.aggregate([{ $sample: { size: 20 } }, { "$project": {
            username: 1,
            firstName: 1,
            lastName: 1,
            accountType: 1,
            uniqueId: 1,
            registrationDate: 1,
            completedJobs: 1,
            followingHackers: 1,
            followingCompanies: 1,
            points: 1,
            profilePicsVideos: 1,
            profileBannerImage: 1,
            currentlyFollowedBy: 1
        }}, {
            "$match": {
                $or: [ { firstName: { $regex: searching }}, { lastName: { $regex: searching }} ]
            }
        }]).toArray((err, users) => {
            if (err) {
                console.log("Error occurred while gathering random users...");

                reject(err);
            } else {
                resolve(users);
            }
        });
    })
    promiseBoth.then((passedData) => {
        hackerCollection.aggregate([{ $sample: { size: 20 } }, { "$project": {
            username: 1,
            firstName: 1,
            lastName: 1,
            accountType: 1,
            uniqueId: 1,
            registrationDate: 1,
            completedJobs: 1,
            followingHackers: 1,
            followingCompanies: 1,
            points: 1,
            profilePicsVideos: 1,
            profileBannerImage: 1,
            currentlyFollowedBy: 1
        }}, {
            "$match": {
                $or: [ { firstName: { $regex: searching }}, { lastName: { $regex: searching }} ]
            }
        }]).toArray((err, users) => {
            if (err) {
                console.log("Error occurred while gathering random users...");
            } else {
                resppppp.json({
                    message: "Successfully fetched the desired users!",
                    users: [...passedData, ...users]
                })
            }
        });
    })
    promiseBoth.catch((err) => {
        resppppp.json({
            message: "An error occurred while attempting to gather relevant users",
            err
        })
    })
});

module.exports = router;