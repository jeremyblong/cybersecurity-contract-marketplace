const express = require("express");
const router = express.Router();
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../schemas/authentication/authenticate.js");
const passport = require("passport");
const mongoUtil = require("../../../mongoUtil.js");
// mongodb connection
// const db = mongoUtil.getDb();

router.post("/", passport.authenticate("employers"), (req, resppppp, next) => {

    const { 
        password,
        usernameOrEmail 
    } = req.body;

    const trimLowercaseIdentifier = usernameOrEmail.toLowerCase().trim();

    const token = getToken({ _id: req.user._id });

    const refreshToken = getRefreshToken({ _id: req.user._id });

    const collection = db.collection("employers");

    collection.findOne({ $or: [{
        username: trimLowercaseIdentifier
    }, {
        email: trimLowercaseIdentifier
    }]}).then((user) => {
        
        console.log(user);
        
        if (((trimLowercaseIdentifier === user.username) || (trimLowercaseIdentifier === user.email)) && (password === user.password)) {
            user.refreshToken.push({ refreshToken });

            collection.save(user, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved...!", result);

                    resppppp.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            
                    resppppp.send({ success: true, token });
                }
            })
        } else {
            resppppp.json({
                message: "User could NOT be authenticated - make sure you're using a valid email and password combination."
            })
        }
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;