const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { tutorialID } = req.query;

    const collection = Connection.db.db("db").collection("tutorialshorts");

    collection.findOne({ id: tutorialID }).then((tutorial) => {
        if (!tutorial) {
            console.log("tutorial does NOT exist or could not be found.");

            resppppp.json({
                message: "tutorial does NOT exist or could not be found."
            })
        } else {
            console.log("tutorial", tutorial);

            resppppp.json({
                message: "Successfully gathered tutorial!",
                tutorial
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