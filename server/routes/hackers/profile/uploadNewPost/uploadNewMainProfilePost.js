const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");


router.post("/", (req, resppppp, next) => {
    
    const { 
        description, 
        typeOfPost,
        title,
        uploaded,
        signedinUserID 
    } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

    const newPostAddition = {
        description, 
        typeOfPost,
        title,
        comments: [],
        reactions: {
            partying: 0,
            screaming: 0,
            steaming: 0,
            sunglasses: 0,
            tearsOfJoy: 0,
            vomitting: 0
        },
        alreadyReacted: [],
        uploadedRelevantFiles: uploaded,
        posterID: signedinUserID,
        uniqueId: uuidv4(),
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a")
    }

    collection.findOneAndUpdate({ uniqueId: signedinUserID }, { $push: { profilePosts: newPostAddition }}, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log("Err", err);

            resppppp.json({
                message: "An error occurred while attempting to modify/update profile information...",
                err
            })
        } else {

            console.log("result! :", result);
            
            resppppp.json({
                message: "Successfully updated/uploaded new wall post!",
                user: result.value
            })
        }
    });
});

module.exports = router;