const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const _ = require("lodash");

router.get("/", (req, resppppp, next) => {
    
    const { uniqueId, accountType } = req.query;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId }, { fields: {
        reviews: 1
    }}).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            resppppp.json({
                message: "Gathered reviews!",
                reviews: _.has(user, "reviews") ? user.reviews : []
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