const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");
const _ = require("lodash");


router.post("/", (req, resppppp, next) => {
    
    const { id, accountType, socials } = req.body;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ uniqueId: id }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            if (_.has(user, "socials")) {
                for (const key in socials) {
                    const value = socials[key];
    
                    if (typeof value !== "undefined" && value.length > 0) {
                        user.socials[key] = value;
                    }
                }

                collection.save(user, (err, result) => {
                    if (err) {
                        console.log(err);

                        resppppp.json({
                            message: "An error has occurred while attempting to save the modified data..",
                            err
                        })
                    } else {
                        console.log("result", result);

                        resppppp.json({
                            message: "Successfully updated socials for this account!",
                            user
                        })
                    }
                })
            } else {
                user["socials"] = socials;

                collection.save(user, (err, result) => {
                    if (err) {
                        console.log(err);

                        resppppp.json({
                            message: "An error has occurred while attempting to save the modified data..",
                            err
                        })
                    } else {
                        console.log("result", result);

                        resppppp.json({
                            message: "Successfully updated socials for this account!",
                            user
                        })
                    }
                })
            }
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