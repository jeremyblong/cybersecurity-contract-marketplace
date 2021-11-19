const express = require("express");
const router = express.Router();
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../../../schemas/authentication/authenticate.js");
const passport = require("passport");
const { Connection } = require("../../../mongoUtil.js");
const { decrypt } = require("../../../crypto.js");
const { ObjectID } = require("mongodb");


router.post("/", (req, resppppp, next) => {

    passport.authenticate('employers', (err, user, info) => {
        if (err) { 
            resppppp.json({
                message: "User could NOT be authenticated - make sure you're using a valid email and password combination."
            })
        } else {
            if (!user) {
                resppppp.json({
                    message: "User could NOT be authenticated - make sure you're using a valid email and password combination."
                })
            } else {
                const { 
                    password,
                    usernameOrEmail 
                } = req.body;
            
                const trimLowercaseIdentifier = usernameOrEmail.toLowerCase().trim();
            
                const collection = Connection.db.db("db").collection("employers");
            
                console.log("ran")
            
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
            
                            user.refreshToken.push({ refreshToken, _id: new ObjectID() });
            
                            collection.save(user, (err, result) => {
                                if (err) {
                                    console.log(err);
                                } else {
            
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
            }
        }
    })(req, resppppp, next);
})

module.exports = router;