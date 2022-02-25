const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const {  } = req.query;

    const courseLearningCollection = Connection.db.db("db").collection("learningteachingcourses");

    courseLearningCollection.aggregate([{ $sample: { size: 20 } }]).toArray((err, courses) => {
        if (err) {
            console.log("Error occurred while gathering live-streams...");
        } else {
            resppppp.json({
                message: "Successfully gathered courses for sale!",
                courses
            })
        }
    });
});

module.exports = router;