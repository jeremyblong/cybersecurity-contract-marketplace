const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const CreateNewCourse = require("../../../../schemas/learningCourses/createNewCourseAsHacker.js");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

router.post("/", (req, resppppp, next) => {
    
    const { courseData, id } = req.body;

    const { pageOneData, pageTwoData, pageThreeData } = courseData;

    const collection = Connection.db.db("db").collection("hackers");
    const courseCollection = Connection.db.db("db").collection("learningteachingcourses");

    collection.findOne({ uniqueId: id }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {

            const generatedID = uuidv4();

            const NewCourseCreation = new CreateNewCourse({
                mainData: {
                    pageOneData, 
                    pageTwoData, 
                    pageThreeData
                },
                id: generatedID,
                date: new Date(),
                dateString: moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"),
                comments: [],
                likes: 0,
                likedBy: [],
                dislikedBy: [],
                viewedBy: [],
                dislikes: 0,
                poster: id,
                bookmarks: [],
                purchased: [],
                totalViews: 0
            });

            NewCourseCreation.save((error, result) => {
                if (error) {
                    console.log("error", error);

                    resppppp.json({
                        message: "Error CREATING new course data in collection...",
                        err: error
                    })
                } else {

                    collection.save(user, async (errorrrrrr, dataaaaaa) => {
                        if (errorrrrrr) {
                            console.log("err saving user data...:", errorrrrrr);

                            const deleted = await courseCollection.deleteOne({ id: generatedID });
                            
                            resppppp.json({
                                message: "Error SAVING user data however course was saved/uploaded...",
                                err: errorrrrrr
                            })
                        } else {
                            resppppp.json({
                                message: "Successfully posted new course for sale!",
                                user: result
                            })
                        }
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