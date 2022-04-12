const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const CreateNewTutorialCourse = require("../../../../schemas/tutorialShortCourses/createNewTutorialCourseShort.js");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');


router.post("/", (req, resppppp, next) => {
    
    const { uniqueId, posterName, data, accountType } = req.body;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const newTutorialData = new CreateNewTutorialCourse({
                mainData: data,
                id: uuidv4(),
                date: new Date(),
                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                likedBy: [],
                dislikedBy: [],
                viewedBy: [],
                viewedByList: [],
                totalTipAmount: 0,
                comments: [],
                likes: 0,
                dislikes: 0,
                totalViews: 0,
                posterName,
                posterID: uniqueId,
                bookmarks: [],
                purchased: []
            })

            newTutorialData.save((error, saved) => {
                if (error) {
                    console.log(error);

                    resppppp.json({
                        message: "An error occurred while attempting to save new tutorial data..",
                        err: error
                    })
                } else {
                    console.log("saved", saved);

                    resppppp.json({
                        message: "Successfully posted tutorial!",
                        data: saved
                    })
                }
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