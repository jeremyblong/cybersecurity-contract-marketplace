const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.post("/", (req, resppppp, next) => {
    
    const { uniqueId, identityAccessKey } = req.body;

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ uniqueId }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "An error occurred while saving new verification data..."
            })
        } else {
            console.log("user", user);

            user.identityVerified = true;
            user["passbaseIDAccessKey"] = identityAccessKey;

            collection.save(user, (errrrrrrrr, result) => {
                if (errrrrrrrr) {
                    console.log(errrrrrrrr);

                    resppppp.json({
                        message: "Error occurred while attempting to save new data to user's account..."
                    })
                } else {
                    resppppp.json({
                        message: "Saved verification data!",
                        user
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