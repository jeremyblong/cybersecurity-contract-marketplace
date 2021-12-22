const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../../mongoUtil.js");

router.get("/", (req, resppppp, next) => {
    
    const { uniqueId } = req.query;

    const collection = Connection.db.db("db").collection("employers");

    const options = { fields: { profileBannerImage: 1, profilePicsVideos: 1 } };

    const query = { uniqueId };

    collection.findOne(query, options).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            resppppp.json({
                message: "Gathered relevant information!",
                user
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