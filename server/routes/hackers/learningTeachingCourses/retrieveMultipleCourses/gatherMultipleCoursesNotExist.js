const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { id } = req.query;

    const collection = Connection.db.db("db").collection("learningteachingcourses");

    collection.aggregate([{ $sample: { size: 20 } }]).toArray((err, courses) => {
        if (err) {
            resppppp.json({
                message: "An error occurred while attempting to gather courses!",
                err
            })
        } else {
            resppppp.json({
                message: "Successfully gathered courses!",
                courses
            })
        }
    })
});

module.exports = router;