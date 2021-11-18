const express = require("express");
const router = express.Router();
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../schemas/authentication/authenticate.js");
const passport = require("passport");
const { Connection } = require("../../../mongoUtil.js");
const { decrypt } = require("../../../crypto.js");

router.post("/", passport.authenticate("hackers"), (req, resppppp, next) => {

    const { 
        password,
        usernameOrEmail 
    } = req.body;

    console.log("ran");

    const trimLowercaseIdentifier = usernameOrEmail.toLowerCase().trim();

    const token = getToken({ _id: req.user._id });

    const refreshToken = getRefreshToken({ _id: req.user._id });

    const collection = Connection.db.db("db").collection("hackers");

    collection.findOne({ $or: [{
        username: trimLowercaseIdentifier
    }, {
        email: trimLowercaseIdentifier
    }]}).then((user) => {
        
        console.log(user);

        const decrypted = decrypt(user.password);
        
        if (((trimLowercaseIdentifier === user.username) || (trimLowercaseIdentifier === user.email)) && (password === decrypted)) {

            user.refreshToken.push({ refreshToken });

            collection.save(user, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved...!", result);

                    resppppp.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            
                    resppppp.send({ success: true, token, message: "Successfully logged in!", data: user });
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