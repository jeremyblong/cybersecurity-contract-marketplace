const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");
const _ = require("lodash");
const config = require("config");

router.post("/", (req, resppppp, next) => {
    // deconstruct passed data from front-end - "applicationData" contains BULK of NEW/APPLICATION DETAILS...
    const { applicantID, listingID, userData, employerPostedJobId, generatedID, employerId, applicationData } = req.body;
    // deconstruct parts of user to make public
    const {
        firstName,
        lastName,
        username,
        registrationDate,
        completedJobs,
        reviews,
        followingHackers,
        followingCompanies,
        profilePicsVideos,
        title,
        publicEmailAddress,
        aboutMe,
        yearsOfExperience,
        birthdate,
        gender,
        experiencePoints,
        rankLevel,
        profileBannerImage,
        points,
        fullyVerified
    } = userData;
    // select employers collection
    const employerCollection = Connection.db.db("db").collection("employers");
    // select hackers collection
    const hackerCollection = Connection.db.db("db").collection("hackers");
    // select employers collection
    const listingsCollection = Connection.db.db("db").collection("employerlistings");
    // create applicant object
    const applicantObj = {
        ...applicationData, 
        userData: {
            firstName,
            lastName,
            username,
            registrationDate,
            completedJobs,
            reviews,
            followingHackers,
            followingCompanies,
            profilePicsVideos,
            title,
            publicEmailAddress,
            aboutMe,
            yearsOfExperience,
            birthdate,
            gender,
            experiencePoints,
            rankLevel,
            profileBannerImage,
            points,
            fullyVerified
        }
    }
    // select employerlistings collection
    listingsCollection.findOneAndUpdate({ uniqueId: listingID }, { $push: {
        applicants: applicantObj,
        applicantIDArray: applicantID
    }}, (err, listing) => {
        if (err) {
            console.log("error critical updating data...:", err);
            
            console.log(err);

            employerCollection.findOneAndUpdate({ uniqueId: employerId }, { $pull: { applicants: { generatedID }}}).then(() => console.log("done")).catch((err) => console.log(err));
            hackerCollection.findOneAndUpdate({ uniqueId: applicantID }, { $pull: { previouslyAppliedJobs: { generatedID }}}).then(() => console.log("done")).catch((err) => console.log(err));

            console.log("listing does NOT exist or could not be found.");

            resppppp.json({
                message: "Unknown error.",
                err
            })
        } else {
            if (!listing) {

                employerCollection.findOneAndUpdate({ uniqueId: employerId }, { $pull: { applicants: { generatedID }}}).then(() => console.log("done")).catch((err) => console.log(err));
                hackerCollection.findOneAndUpdate({ uniqueId: applicantID }, { $pull: { previouslyAppliedJobs: { generatedID }}}).then(() => console.log("done")).catch((err) => console.log(err));
    
                console.log("listing does NOT exist or could not be found.");
    
                resppppp.json({
                    message: "listing does NOT exist or could not be found."
                })
            } else {
                console.log("listing", listing);
            
                resppppp.json({
                    message: "Successfully updated employer listing data!"
                })
            }
        }
    })
});

module.exports = router;