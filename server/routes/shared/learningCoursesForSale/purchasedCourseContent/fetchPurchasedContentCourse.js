const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { uniqueId, accountType, courseID } = req.query;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId }, { fields: {
        purchasedCourseData: 1
    }}).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            const findIndexCourseData = user.purchasedCourseData.findIndex((course) => course.id === courseID);

            const matchedCourse = user.purchasedCourseData[findIndexCourseData];

            resppppp.json({
                message: "Successfully gathered course!",
                course: matchedCourse
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