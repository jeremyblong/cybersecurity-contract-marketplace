const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');


router.post("/", (req, resppppp, next) => {
    
    const {  
        signedinID,
        communityName, 
        mainDescription, 
        title 
    } = req.body;

    const collection = Connection.db.db("db").collection("forumcommunities");

    const newSubthreadAddition = {
        title,
        description: mainDescription,
        postedBy: signedinID,
        subcomments: [],
        peopleSubCommented: [],
        likes: [],
        dislikes: [],
        id: uuidv4(),
        date: new Date(),
        dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
        reactionsToMainPost: {
            partying: 0,
            screaming: 0,
            steaming: 0,
            sunglasses: 0,
            tearsOfJoy: 0,
            vomitting: 0
        }
    }

    collection.findOneAndUpdate({ id: communityName.id }, { $push: { subthreads: newSubthreadAddition }}, { returnOriginal: false }, (err, result) => {
        if (err) {
            console.log("err", err);

            resppppp.json({
                message: "An error occurred while attempting to make updates/edits...",
                err
            })
        } else {
            console.log("result!", result);

            const { value } = result;

            resppppp.json({
                message: "Successfully posted to the desired community!",
                updatedCommunity: value
            })
        }
    });
});

module.exports = router;