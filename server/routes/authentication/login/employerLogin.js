const express = require("express");
const router = express.Router();
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../schemas/authentication/authenticate.js");
const passport = require("passport");
const { Connection } = require("../../../mongoUtil.js");
const { decrypt } = require("../../../crypto.js");

router.post("/", passport.authenticate("employers"), (req, resppppp, next) => {

    const { 
        password,
        usernameOrEmail 
    } = req.body;

    const trimLowercaseIdentifier = usernameOrEmail.toLowerCase().trim();

    const collection = Connection.db.db("db").collection("employers")

    collection.findOne({ $or: [{
        username: trimLowercaseIdentifier
    }, {
        email: trimLowercaseIdentifier
    }]}).then((user) => {
        if (!user) {
            resppppp.json({
                message: "User could NOT be authenticated - make sure you're using a valid email and password combination."
            })
        } else {
            const decrypted = decrypt(user.password);
        
            if (((trimLowercaseIdentifier === user.username) || (trimLowercaseIdentifier === user.email)) && (password === decrypted)) {

                const token = getToken({ _id: user._id });

                const refreshToken = getRefreshToken({ _id: user._id });

                user.refreshToken.push({ refreshToken });

                collection.save(user, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully saved...!", result);

                        resppppp.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                
                        resppppp.json({ success: true, token, message: "Successfully logged in!", data: user });
                    }
                })
            } else {
                resppppp.json({
                    message: "User could NOT be authenticated - make sure you're using a valid email and password combination."
                })
            }
        }
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;