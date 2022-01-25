const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { id } = req.query;

    const collection = Connection.db.db("db").collection("learningteachingcourses");

    collection.findOne({ id }).then((course) => {
        if (!course) {
            console.log("course does NOT exist or could not be found.");

            resppppp.json({
                message: "course does NOT exist or could not be found."
            })
        } else {
            console.log("course", course);

            resppppp.json({
                message: "Successfully fetched course/listing!",
                course
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