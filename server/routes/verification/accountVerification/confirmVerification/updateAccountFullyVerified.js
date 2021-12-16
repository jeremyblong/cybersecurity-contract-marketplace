const express = require("express");
const router = express.Router();
const { Connection } = require("../../../../mongoUtil.js");

router.post("/", (req, res, next) => {
    
    const { passbaseIDAccessKey, accountType } = req.body;

    const collection = Connection.db.db("db").collection(accountType);

    collection.findOne({ passbaseIDAccessKey }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            res.json({
                message: "User does NOT exist or could not be found."
            })
        } else {
            console.log("user", user);

            user.fullyVerified = true;

            collection.save(user, (error, result) => {
                if (error) {
                    console.log("error saving new user data! : ", error);

                    res.json({
                        message: "Error occurred while saving new user data regarding successful account verification.",
                        err: error
                    });
                } else {
                    res.json({
                        message: "Successfully updated account!",
                        user
                    })
                }
            });
        }
    }).catch((err) => {
        console.log(err);

        res.json({
            message: "Unknown error.",
            err
        })
    })
});

module.exports = router;